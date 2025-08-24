import { ArtifactStore } from "./Store";

self.onmessage = function (e: MessageEvent<Omit<ArtifactStore, "plotdata" | "chances">>) {
  const {
    mainstats,
    substats,
    supplementary,
    substatBounds,
  } = e.data;

  self.postMessage({
    chances: {
      mainstatConfig: calcMainOdds(mainstats),
      substatConfig: substatConfig(substats.length, substats.slice(), mainstats),
      fourLinerUpgrade: supplementary[1] !== 2 ? upgrade(5, substatBounds, supplementary[2]) : 0,
      threeLinerUpgrade: supplementary[1] !== 1 ? upgrade(4, substatBounds, supplementary[2]) : 0,
      onsetChance: supplementary[2] === 4 ? 1 : 1 / supplementary[0],
      doubleDropRate: doubleDropRate(supplementary[2]),
      initialAffixCount: initialAffixCount(supplementary[2]),
      get final() {
        return this.mainstatConfig * this.substatConfig * this.onsetChance *
          (this.fourLinerUpgrade + this.threeLinerUpgrade);
      }
    },
    get plotdata() {
      return geometricDistribution(this.chances.final, supplementary[2], this.chances.doubleDropRate);
    }
  } satisfies { chances: ArtifactStore["chances"], plotdata: ArtifactStore["plotdata"] });

  self.close();
}

/** Calculates factorial with memoization */
const fact = function () {
  const mem: number[] = [1];

  function get(k: number): number {
    if (k >= mem.length) {
      for (let i = mem.length; i <= k; i++) {
        mem.push(mem[i - 1] * i);
      }
    }

    return mem[k];
  }

  return get;
}();

function substatConfig(k: number, sub: number[], mainstat: number[]) {
  let final = 0;

  function permutate(k: number, sub: number[]) {
    // Heap's Algorithm to get every permutation: https://en.wikipedia.org/wiki/Heap%27s_algorithm
    if (k === 1) {
      // flexible substat config already calculates every permutation when ANY is included.
      // To avoid double counting when calculating permutations, devide by multiplicity.
      final += flexibleSubConfig(mainstat, sub.slice()) / fact(sub.filter(e => e === -1).length);
    } else {
      permutate(k - 1, sub);
      for (let i = 0; i < k - 1; i++) {
        if (k % 2 === 0)
          [sub[i], sub[k - 1]] = [sub[k - 1], sub[i]];
        else
          [sub[0], sub[k - 1]] = [sub[k - 1], sub[0]];
        permutate(k - 1, sub);
      }
    }
  }

  permutate(k, sub);

  return final;
}

/** Calculates the odds for a specific substat configuration */
function fixedSubConfig(mainstat: number[], substats: number[]) {
  if (substats.includes(mainstat[1]))
    return 0;

  let chance = 1;   // hp, atk, def, hp%,atk%,def%, ER%, EM ,cr%,cd%
  const subWeights = [150, 150, 150, 100, 100, 100, 100, 100, 75, 75];
  if ((mainstat[1] < 10) && (mainstat[1] >= 0)) {
    subWeights[mainstat[1]] = 0;
  }
  for (let i = 0; i < substats.length; i++) {
    chance *= subWeights[substats[i]] / (subWeights.reduce((a, b) => a + b, 0));
    subWeights[substats[i]] = 0;
  }

  return chance;
}

/** Calculates the odds for substat configurations with "ANY" */
function flexibleSubConfig(mainstat: number[], substats: number[]) {
  if (!substats.includes(-1)) {
    return fixedSubConfig(mainstat, substats);
  } else {
    let chance = 0;
    // For every substats with "ANY", every possible combination of substat 
    let hmax = substats[0] === -1 ? 10 : 1;
    let imax = substats[1] === -1 ? 10 : 1;
    let jmax = substats[2] === -1 ? 10 : 1;
    let kmax = substats[3] === -1 ? 10 : 1;
    for (let h = 0; h < hmax; h++) {
      for (let i = 0; i < imax; i++) {
        for (let j = 0; j < jmax; j++) {
          for (let k = 0; k < kmax; k++) {
            substats[0] = hmax === 1 ? substats[0] : h;
            substats[1] = imax === 1 ? substats[1] : i;
            substats[2] = jmax === 1 ? substats[2] : j;
            substats[3] = kmax === 1 ? substats[3] : k;
            chance += fixedSubConfig(mainstat, substats);
          }
        }
      }
    }
    return chance;
  }
}

/** Calculats the odds for an artifact type with specific main stat. */
function calcMainOdds(mainstat: number[]) {
  // Artifact type
  let mainchance = 0.2;
  let mainweights: number[];

  switch (mainstat[0]) {
    case 2: { // Sands
      mainweights = [0, 0, 0, 1334, 1333, 1333, 500, 500, 0, 0];
      break;
    }
    case 3: { // Goblet
      //             hp,atk,def,hp%,atk%,def%,ER%,EM,cr%,cd%,physical%,pyro%,electro%,cryo%,hydro%,anemo%,geo%,dendro%
      //mainweights=[0, 0, 0, 850, 850, 800, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200]; prior 3.0
      mainweights = [0, 0, 0, 770, 770, 760, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200, 200];
      break;
    }
    case 4: { // Circlet
      mainweights = [0, 0, 0, 1100, 1100, 1100, 0, 200, 500, 500, 500];
      break;
    }
    default: {
      return mainchance;
    }
  }

  return mainchance * mainweights[mainstat[1]] / (mainweights.reduce((a, b) => a + b, 0));
}

/** Gives the chance of exactly getting a certain set of substat values */
function MultinomPDF(stat: number[]) {
  const N = stat.reduce((a, b) => a + b, 0);
  let coeff = fact(N);

  for (const xi of stat) {
    coeff /= fact(xi);
  }

  return coeff * Math.pow(0.25, N);
}

/** Weak composition for fixed binsize of 4 */
function* weak_composition(totalSum: number, bounds: number[][]) {
  for (let h = bounds[0][0]; h <= bounds[0][1]; h++) {
    for (let i = bounds[1][0]; i <= bounds[1][1]; i++) {
      if (h + i > totalSum) break;

      for (let j = bounds[2][0]; j <= bounds[2][1]; j++) {
        if (h + i + j > totalSum) break;

        var k = totalSum - h - i - j;
        if ((k >= bounds[3][0] && k <= bounds[3][1])) {
          yield [h, i, j, k];
        }
      }
    }
  }
  return 0;
}

/** Chance of an upgrade to lie within a range */
function upgrade(sums: 4 | 5, substatBounds: number[][], source: number) {
  // For every weak composition of upgrade rolls,
  // we calculate the probability of every composition and add them up.
  let total = 0;

  weak_composition(sums, substatBounds).forEach(comp => {
    total += MultinomPDF(comp);
  });

  const weight = initialAffixCount(source)[sums === 4 ? 3 : 4];
  return total * weight;
}

function initialAffixCount(source: number) {
  return [
    { 3: 0.8, 4: 0.2 },   // Stygian Onslaught
    { 3: 0.8, 4: 0.2 },   // Domain
    { 3: 0.66, 4: 0.34 }, // Bosses
    { 3: 0.66, 4: 0.34 }, // Weekly Bosses
    { 3: 0.66, 4: 0.34 }, // Strongbox
    { 3: 0.66, 4: 0.34 }, // Domain Reliquary
  ][source];
}

function doubleDropRate(source: number) {
  return [
    0.065,  // Stygian Onslaught
    0.065,  // Domain
    0,      // Bosses
    0.23,   // Weekly Bosses
    0,      // Strongbox
    0,      // Domain Reliquary
  ][source];
}

function geometricDistribution(p: number, source: number, d: number) {
  const y: number[] = [];
  const x: number[] = [];

  // If p gets too small (p < 1%), increase step size
  const stepSize = Math.max(1, Math.round(1e-2 / p));
  if (source) {
    for (let chance = 0, n = 0; chance <= 0.99; n += stepSize) {
      chance = 1 - Math.exp(n * Math.log((1 - p) * (1 - d * p)));
      y.push(chance * 100);
      x.push(n);
    }
  } else {
    // Stygian onslaught: one extra drop every 6th pull
    for (let chance = 0, n = 0; chance <= 0.99; n += stepSize) {
      chance = 1 - Math.exp(n * Math.log((1 - p) * (1 - d * p)) + Math.floor(n / 6) * Math.log(1 - p));
      y.push(chance * 100);
      x.push(n);
    }
  }

  return { x, y };
}
