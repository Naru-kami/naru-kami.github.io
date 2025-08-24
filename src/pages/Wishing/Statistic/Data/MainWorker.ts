import { clamp } from '../../utils';
import { DataMessage } from '../Components/RunButton';
import fftjs from 'fft.js';

self.onmessage = function (e: MessageEvent<DataMessage>) {
  const { char, weap, mode } = e.data;

  const t = performance.now();
  if (mode == 'distribution') {
    if (char.enabled && weap.enabled) {
      const result = getCombined(char.goal, char.pity, char.guaranteed, char.radiance, weap.goal, weap.pity, weap.guaranteed);
      postMessage({ pullsResult: result });
    } else if (char.enabled) {
      const result = cfdToPdf(characterDistribution(char.goal, char.pity, char.guaranteed, char.radiance));
      postMessage({ pullsResult: result });
    } else if (weap.enabled) {
      const result = cfdToPdf(weaponDistribution(weap.goal, weap.pity, weap.guaranteed));
      postMessage({ pullsResult: result });
    }
  } else if (mode == 'fixed') {
    if (char.enabled) {
      const result = getC(char.goal, char.pity, char.guaranteed, char.radiance);
      postMessage({ pullsResult: result });
    } else if (weap.enabled) {
      const result = getR(weap.goal, weap.pity, weap.guaranteed);
      postMessage({ pullsResult: result });
    }
  }
  console.log(`${performance.now() - t} ms`);
  self.close();
}


function character(x: number) {
  return Math.min(1, 0.006 + Math.max(0, (x - 73) * 0.06));
}

function weapon(x: number) {
  return Math.min(1, 0.007 + Math.max(0, (x - 62) * 0.07));
}

function p(x: number, d: (num: number) => number) {
  var product = d(x);
  for (let i = 1; i <= x - 1; i++) {
    product *= 1 - d(i);
  }
  return product;
}

function c(x: number, d: (num: number) => number) {
  var sum = 0;
  for (let i = 1; i <= x; i++) {
    sum += p(i, d);
  }
  return sum;
}

function f0(d: (num: number) => number) {
  const N = d == weapon ? 77 : 90;
  var sum: number[] = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    sum[i] = p(i, d);
  }
  return sum;
}

function fp(pity: number, d: (num: number) => number) {
  const N = d == weapon ? 77 : 90;
  var sum: number[] = new Array(N + 1).fill(0);
  for (let i = pity + 1; i <= N; i++) {
    sum[i - pity] = p(i, d);
  }
  const factor = 1 / (1 - c(pity, d));
  return sum.map(e => e * factor);
}

function gnp(n: number, pity: number, d: (num: number) => number) {
  var product = fp(pity, d);
  const f_0 = f0(d);
  for (let i = 2; i <= n; i++) {
    product = multiplyFFTjs(product, f_0);
  }
  return product;
}

function Pn(n: number, pity: number, d: (num: number) => number) {
  var res = gnp(n, pity, d);
  for (let i = 1; i < res.length; i++) {
    res[i] += res[i - 1];
  }
  return res;
}

function characterDistribution(i: number, pity: number, g: boolean, cr_counter: number) {
  var cdf: number[] = new Array(90 * (2 * i + 2 - (+g)) - pity + 1).fill(0),
    convolution = fiveStarCR(i + 1, g, cr_counter);
  for (let k = i + 1; k <= 2 * i + 2 - (+g); k++) {
    var dist = Pn(k, pity, character);
    for (let x = 1; x <= 90 * (2 * i + 2 - (+g)) - pity; x++) {
      cdf[x] += 100 * convolution[k] * (dist[x] ?? 1);
    }
  }
  return cdf;
}

function getC(pulls: number, pity: number, g: boolean, cr_counter: number) {
  var con = [0, 0, 0, 0, 0, 0, 0];
  if (pulls <= 0) {
    return con;
  }
  for (let i = 0; i <= 6; i++) {
    var convolution = fiveStarCR(i + 1, g, cr_counter);
    for (let k = i + 1; k <= 2 * i + 2 - (+g); k++) {
      var dist = Pn(k, pity, character);
      con[i] += 100 * convolution[k] * (dist[pulls] ?? 1);
    }
  }
  return con;
}

function weaponDistribution(i: number, pity: number, g: boolean) {
  var cdf: number[] = new Array(77 * 2 * i - pity + 1).fill(0),
    a1 = g ? 0.5 : 0.375,
    a2 = 1 - a1,
    convolution = [0, a1, a2];

  for (let k = 1; k < i; k++) {
    convolution = multiplyFFTjs(convolution, [0, 0.375, 0.625]);
  }
  for (let k = 1; k <= 2 * i; k++) {
    // var c = binomial(i + 1 - (+g), k - (i + 1)) * Math.pow(0.375, i + 1 - (+g) - (k - (i + 1))) * Math.pow(0.625, k - (i + 1));
    var dist = Pn(k, pity, weapon);
    for (let x = 1; x <= 77 * 2 * i - pity; x++) {
      cdf[x] += 100 * convolution[k] * (dist[x] ?? 1);
    }
  }
  return cdf;
}

function getR(pulls: number, pity: number, g: boolean) {
  var ref = [0, 0, 0, 0, 0],
    a1 = g ? 0.5 : 0.375,
    a2 = 1 - a1;
  if (pulls <= 0) {
    return ref;
  }
  var convolution = [0, a1, a2];
  for (let i = 1; i <= 5; i++) {
    for (let k = 1; k <= 2 * i; k++) {
      // var l = binomial(i + 1 - (+g), k - (i + 1)) * Math.pow(0.375, i + 1 - (+g) - (k - (i + 1))) * Math.pow(0.625, k - (i + 1));
      var dist = Pn(k, pity, weapon);
      ref[i - 1] += 100 * convolution[k] * (dist[pulls] ?? 1);
    }
    convolution = multiplyFFTjs(convolution, [0, 0.375, 0.625]);
  }
  return ref;
}

function getCombined(charConst: number, charPity: number, charGuaranteed: boolean, cr_counter: number, weapRef: number, weapPity: number, weapGuaranteed: boolean) {
  const weapDist = cfdToPdf(weaponDistribution(weapRef, weapPity, weapGuaranteed).map(e => e / 100));
  const charDist = cfdToPdf(characterDistribution(charConst, charPity, charGuaranteed, cr_counter).map(e => e / 100));
  return multiplyFFTjs(weapDist, charDist).map(e => e * 100);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

function multiplyFFTjs(p1: number[], p2: number[]) {
  const n = nextpower(p1.length + p2.length);

  const fft_js = new fftjs(n);

  var f1: number[] = fft_js.createComplexArray();
  fft_js.realTransform(f1, p1.concat(new Array(n - p1.length).fill(0)));
  fft_js.completeSpectrum(f1);

  var f2: number[] = fft_js.createComplexArray();
  fft_js.realTransform(f2, p2.concat(new Array(n - p2.length).fill(0)));
  fft_js.completeSpectrum(f2);

  var result: number[] = new Array(2 * n).fill(0);
  for (let i = 0; i < result.length; i += 2) {
    result[i] = f1[i] * f2[i] - f1[i + 1] * f2[i + 1];
    result[i + 1] = f1[i] * f2[i + 1] + f1[i + 1] * f2[i];
  }

  fft_js.inverseTransform(f1, result);
  fft_js.fromComplexArray(f1, f2);

  return f2.slice(0, p1.length + p2.length - 1);
}

function nextpower(v: number) {
  v--;
  v |= v >> 1;
  v |= v >> 2;
  v |= v >> 4;
  v |= v >> 8;
  v |= v >> 16;
  v++;
  return v;
}

function cfdToPdf(cdf: number[]) {
  var pdf = [cdf[0]];
  for (let i = cdf.length - 1; i >= 1; i--) {
    pdf[i] = cdf[i] - cdf[i - 1];
  }
  return pdf;
}

type BinaryNode<T> = {
  depth: T,
  losses: T,
  wins: T,
  probability: T,
  left?: BinaryNode<T>,
  right?: BinaryNode<T>,
}

function fiveStarCR(
  cons: number,
  guaranteed: boolean,
  cr_counter: number,
  node: BinaryNode<number> = { depth: 0, losses: 0, wins: 0, probability: 1 },
  branch_prob: number[] = new Array(2 * cons + 1).fill(0)
) {
  if (node.depth == cons) {
    branch_prob[node.losses + cons] += node.probability;
    return branch_prob;
  }
  if (node.probability == 0)
    return branch_prob;

  const win_prob = node.depth == 0 && guaranteed ? 1 : [0.5, 0.5, 6 / 11, 1][cr_counter];

  node.left = { depth: node.depth + 1, losses: node.losses + 1, wins: node.wins, probability: node.probability * (1 - win_prob) };
  node.right = { depth: node.depth + 1, losses: node.losses, wins: node.wins + 1, probability: node.probability * win_prob };

  fiveStarCR(cons, false, cr_counter + 1, node.left, branch_prob); // left: lose 50/50
  fiveStarCR(cons, false, guaranteed ? cr_counter : clamp(0, cr_counter - 1, 1), node.right, branch_prob); // right: win 50/50

  return branch_prob;
}
