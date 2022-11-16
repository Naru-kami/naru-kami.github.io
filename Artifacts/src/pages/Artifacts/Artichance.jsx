import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import CalculateIcon from '@mui/icons-material/Calculate';

const RunButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  '&:hover': {
    backgroundColor: green[900],
  },
}));

function swap(arr, a, b) {
  let c = arr[a];
  arr[a] = arr[b];
  arr[b] = c;
}

function fact(k) {
  if (k === 0)
    return 1;
  else
    return k * fact(k - 1);
}

function calcodds(mainstat, arr) {
  if (arr.includes(mainstat[1]))
    return 0;
  var chance = 1;//hp , atk, def, hp%,atk%,def%, ER%, EM ,cr%,cd%
  var weights = [150, 150, 150, 100, 100, 100, 100, 100, 75, 75];
  if ((mainstat[1] < 10) && (mainstat[1] >= 0))
    weights[mainstat[1]] = 0;
  for (let i = 0; i < arr.length; i++) {
    chance *= weights[arr[i]] / (weights.reduce((a, b) => a + b, 0));
    weights[arr[i]] = 0;
  }
  return chance;
}

function advancedodds(mainstat, arr) {
  if (arr.includes(-1) === false)
    return calcodds(mainstat, arr);
  else {
    var chance = 0;
    let hmax = (arr[0] === -1) * 10 + (arr[0] !== -1);
    let imax = (arr[1] === -1) * 10 + (arr[1] !== -1);
    let jmax = (arr[2] === -1) * 10 + (arr[2] !== -1);
    let kmax = (arr[3] === -1) * 10 + (arr[3] !== -1);
    for (let h = 0; h < hmax; h++) {
      for (let i = 0; i < imax; i++) {
        for (let j = 0; j < jmax; j++) {
          for (let k = 0; k < kmax; k++) {
            arr[0] = (hmax === 1) * arr[0] + (hmax !== 1) * h;
            arr[1] = (imax === 1) * arr[1] + (imax !== 1) * i;
            arr[2] = (jmax === 1) * arr[2] + (jmax !== 1) * j;
            arr[3] = (kmax === 1) * arr[3] + (kmax !== 1) * k;
            chance += calcodds(mainstat, arr);
          }
        }
      }
    }
    return chance;
  }
}

function calcmainodds(mainstat) {
  var mainchance = 0.2;
  var mainweights;
  switch (mainstat[0]) {
    default:
      break;
    case 2: {
      mainweights = [0, 0, 0, 1334, 1333, 1333, 500, 500, 0, 0];
      let x = mainweights[mainstat[1]] / (mainweights.reduce((a, b) => a + b, 0));
      mainchance *= x;
      break;
    }
    case 3: {
      //mainweights=[0, 0, 0, 850, 850, 800, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200]; prior 3.0
      mainweights = [0, 0, 0, 767, 767, 766, 0, 100, 0, 0, 200, 200, 200, 200, 200, 200, 200, 200];
      let x = mainweights[mainstat[1]] / (mainweights.reduce((a, b) => a + b, 0));
      mainchance *= x;
      break;
    }
    case 4: {
      mainweights = [0, 0, 0, 1100, 1100, 1100, 0, 200, 500, 500, 500];
      let x = mainweights[mainstat[1]] / (mainweights.reduce((a, b) => a + b, 0));
      mainchance *= x;
      break;
    }
  }
  return mainchance;
}

function MultinomPDF(stat) {
  var N = stat.reduce((a, b) => a + b, 0);
  var chance = fact(N);
  for (let i = 0; i < stat.length; i++)
    chance /= fact(stat[i]);
  chance *= Math.pow(1 / 4, N);
  return chance;
}

function upgrade(starter, slidervals) {
  var chance = 0, k;
  for (let h = slidervals[0][0]; h <= slidervals[0][1]; h++) {
    for (let i = slidervals[1][0]; i <= slidervals[1][1]; i++) {
      if (h + i > 5) break;
      for (let j = slidervals[2][0]; j <= slidervals[2][1]; j++) {
        if (h + i + j > 5)
          break;
        k = 5 - h - i - j;
        if ((k >= slidervals[3][0] && k <= slidervals[3][1]) && (starter[1] === 0 || starter[1] === 1))
          chance += MultinomPDF([h, i, j, k]) * 0.25;
        k = 4 - h - i - j;
        if ((k >= slidervals[3][0] && k <= slidervals[3][1]) && (starter[1] === 0 || starter[1] === 2))
          chance += MultinomPDF([h, i, j, k]) * 0.75;
      }
    }
  }
  return chance;
}

export default function Artichance({ mainstats, substats, starter, slidervals, trials, pass, updateartichance, updateTrials }) {
  const artichance = React.useRef({ permut: 0, mains: 0, upgrade: 0, set: 0, final: 0 });

  const permutate = React.useCallback((k, sub, mainstat) => {
    if (k === 1)
      artichance.current.final += advancedodds(mainstat, sub.slice()) / (fact(sub.filter(e => e === -1).length));
    else {
      permutate(k - 1, sub, mainstat);
      for (let i = 0; i < k - 1; i++) {
        if (k % 2 === 0)
          swap(sub, i, k - 1);
        else
          swap(sub, 0, k - 1);
        permutate(k - 1, sub, mainstat);
      }
    }
  }, [artichance.current]);

  const populate = React.useCallback(() => {
    var y = [];
    var x = [];
    var chance = 0;
    var n = 0;
    const c = artichance.current.final;
    const t = 1 / trials;
    const r = 1 / t * Math.max(1, Math.round(1e-5 / c));
    while (chance <= 0.99) { // 90% - 97% - 99%
      chance = 1 - Math.exp(n * Math.log(1 - c));
      y.push(chance * 100);
      x.push(n * t);
      n += r;
    }
    pass({ x: x, y: y });
  }, [artichance.current.final, trials]);

  function calc() {
    artichance.current.final = 0;
    permutate(substats.length, substats.slice(), mainstats);
    artichance.current.permut = artichance.current.final;

    artichance.current.mains = calcmainodds(mainstats);
    artichance.current.final *= artichance.current.mains;

    artichance.current.upgrade = upgrade(starter, slidervals);
    artichance.current.final *= artichance.current.upgrade;

    artichance.current.set = 1 / starter[0];

    artichance.current.final /= starter[0];
    populate();
    updateartichance(artichance.current);
    updateTrials(trials);
  }

  return (
    <RunButton variant="contained" onClick={calc} sx={{ mt: 3, pl: '6px', ml: 1, mb: 1 }}> <CalculateIcon /> <span style={{ fontVariant: 'small-caps', height: '24px' }}><strong>&nbsp;calculate</strong></span></RunButton>
  )
}
