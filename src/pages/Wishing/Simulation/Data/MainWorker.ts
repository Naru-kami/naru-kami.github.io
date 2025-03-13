import { clamp } from '../../utils';
import { DataMessage } from '../Components/RunButton';

self.onmessage = function (e: MessageEvent<DataMessage>) {
  const { data } = e

  const timer = performance.now();
  const pullsResult = data.mode == 'distribution' ? SimDist(data) : SimFixed(data);
  console.log(performance.now() - timer);
  postMessage({
    pullsResult: pullsResult
  });
  self.close();
}

function GetStarglitter(star: 4 | 5, count: number) {
  return +(star == 5) && (+(count == -1) * 0 + +(count >= 0 && count < 6) * 10 + +(!(count == -1) && !(count >= 0 && count < 6)) * 25) || +(star == 4) && (+(count == -1) * 0 + +(count >= 0 && count < 6) * 2 + +(!(count == -1) && !(count >= 0 && count < 6)) * 5);
}

function SimDist({ char, weap, starglitter, samplesize }: DataMessage) {
  var debounce = Date.now();
  var progress = 0;
  var prob5 = 0;
  var prob4 = 0;
  var pullsResult = [0];

  for (let j = 0; j < samplesize; j++) {
    let pulls = 0;
    let starglitterCount = starglitter.count;

    if (char.enabled) {
      let guaranteed = char.guaranteed;
      let counter5 = char.pity + 1;
      let counter4 = 1;
      let promoted = 0;
      let fs1 = 0, fs2 = 0, fs3 = 0;
      let radiance = char.radiance;

      while (promoted <= char.goal) {
        pulls++;
        if (starglitter.enabled && starglitterCount >= 5) {
          pulls--;
          starglitterCount -= 5;
        }
        prob5 = Math.min(1, 0.006 + Math.max(0, (counter5 - 73) * 0.06));
        prob4 = Math.min(1, 0.051 + Math.max(0, (counter4 - 8) * 0.51));
        let x = Math.random();
        if (x < prob5) {
          if (x <= (prob5 * 0.5) || guaranteed || (radiance == 2 && (x < prob5 * 6 / 11)) || radiance >= 3) {
            !guaranteed && (radiance = clamp(0, radiance - 1, 1));
            guaranteed = false;
            starglitterCount += GetStarglitter(5, promoted + starglitter.cons[0]);
            promoted++;
          } else {
            guaranteed = true;
            radiance++;
            starglitterCount += 5;
          }
          counter5 = 1;
          counter4++;
        } else if (x < prob4 + prob5) {
          counter5++;
          counter4 = 1;
          if (starglitter.enabled) {
            if (x < (prob4 + prob5) / 3 / 2) {
              starglitterCount += GetStarglitter(4, fs1 + starglitter.cons[1]);
              fs1++;
            } else if (x < (prob4 + prob5) / 3) {
              starglitterCount += GetStarglitter(4, fs2 + starglitter.cons[2]);
              fs2++;
            } else if (x < (prob4 + prob5) / 2) {
              starglitterCount += GetStarglitter(4, fs3 + starglitter.cons[3]);
              fs3++;
            } else { starglitterCount += 2; }
          }
        } else {
          counter5++;
          counter4++;
        }
      }
    }
    if (weap.enabled) {
      let gc = 0;
      let counter5 = weap.pity + 1;
      let counter4 = 1;
      let promoted = 0;
      let offbanner = weap.guaranteed;
      while (promoted < weap.goal) {
        pulls++;
        if (starglitter.enabled && starglitterCount >= 5) {
          pulls--;
          starglitterCount -= 5;
        }
        prob5 = Math.min(1, 0.007 + Math.max(0, (counter5 - 62) * 0.07));
        prob4 = Math.min(1, 0.06 + Math.max(0, (counter4 - 7) * 0.6));
        let x = Math.random();
        if (x < prob5) {
          if (x <= prob5 * (offbanner ? 0.5 : 0.375) || gc === 1) {
            gc = 0;
            promoted++;
            offbanner = false;
          } else if (x <= prob5 * (offbanner ? 1 : 0.75)) {
            offbanner = false;
            gc++;
          } else {
            offbanner = true;
            gc++;
          }
          starglitterCount += 10;
          counter5 = 1;
          counter4++;
        } else if (x < prob4 + prob5) {
          counter5++;
          counter4 = 1;
          starglitterCount += 2;
        } else {
          counter5++;
          counter4++;
        }
      }
    }

    if (pullsResult[pulls] == null) {
      for (let k = pullsResult.length; k <= pulls; k++) {
        pullsResult.push(0);
      }
    }

    pullsResult[pulls]++;

    if (((j / samplesize * 100) > progress + 1) && (Date.now() - debounce) > 350) {
      debounce = Date.now();
      progress = (j / samplesize * 100) >> 0;
      postMessage({ progress: progress });
    }
  }
  return pullsResult;
}

function SimFixed({ char, weap, starglitter, samplesize }: DataMessage) {
  var prob5: number,
    prob4: number,
    x: number,
    guaranteed: boolean,
    counter5: number,
    counter4: number,
    promoted: number,
    starglitterCount: number,
    fs1: number,
    fs2: number,
    fs3: number;
  var debounce = Date.now();
  var progress = 0;

  if (char.enabled) {
    let pullsResult: number[] = new Array(8).fill(0);
    for (let k = 0; k < samplesize; k++) {
      let radiance = char.radiance;
      guaranteed = char.guaranteed;
      counter5 = char.pity + 1;
      counter4 = 1;
      promoted = 0;
      starglitterCount = starglitter.count;
      fs1 = 0, fs2 = 0, fs3 = 0;

      for (let pulls = char.goal; ~pulls + 1; --pulls) {
        if (starglitter.enabled && starglitterCount >= 5) {
          pulls++;
          starglitterCount -= 5;
        }
        prob5 = Math.min(1, 0.006 + Math.max(0, (counter5 - 73) * 0.06));
        prob4 = Math.min(1, 0.051 + Math.max(0, (counter4 - 8) * 0.51));
        x = Math.random();
        if (x < prob5) {
          if (x <= (prob5 * 0.5) || guaranteed || (radiance == 1 && (x <= prob5 * 0.525)) || (radiance == 2 && (x <= prob5 * 0.75)) || radiance >= 3) {
            !guaranteed && (radiance = 0);
            guaranteed = false;
            starglitterCount += GetStarglitter(5, promoted + starglitter.cons[0]);
            promoted++;
            if (promoted == 7) {
              break;
            }
          } else {
            guaranteed = true;
            radiance++;
            starglitterCount += 5;
          }
          counter5 = 1;
          counter4++;
        } else if (x < prob5 + prob4) {
          counter5++;
          counter4 = 1;
          if (starglitter.enabled) {
            if (x < (prob4 + prob5) / 3 / 2) {
              starglitterCount += GetStarglitter(4, fs1 + starglitter.cons[1]);
              fs1++;
            } else if (x < (prob4 + prob5) / 3) {
              starglitterCount += GetStarglitter(4, fs2 + starglitter.cons[2]);
              fs2++;
            } else if (x < (prob4 + prob5) / 2) {
              starglitterCount += GetStarglitter(4, fs3 + starglitter.cons[3]);
              fs3++;
            } else { starglitterCount += 2; }
          }
        } else {
          counter4++;
          counter5++;
        }
      }
      pullsResult[promoted]++;
      if (((k / samplesize * 100) > progress + 1) && (Date.now() - debounce) > 350) {
        debounce = Date.now();
        progress = (k / samplesize * 100) >> 0;
        postMessage({ progress: progress });
      }
    }
    return pullsResult;
  } else if (weap.enabled) {
    let pullsResult: number[] = new Array(6).fill(0);
    let gc: number;
    for (let k = 0; k < samplesize; k++) {
      guaranteed = weap.guaranteed;
      counter5 = weap.pity + 1;
      counter4 = 1;
      promoted = 0;
      gc = 0;
      starglitterCount = starglitter.count;

      for (let pulls = weap.goal; ~pulls + 1; --pulls) {
        if (starglitter.enabled && starglitterCount >= 5) {
          pulls++;
          starglitterCount -= 5;
        }
        prob5 = Math.min(1, 0.007 + Math.max(0, (counter5 - 62) * 0.07));
        prob4 = Math.min(1, 0.06 + Math.max(0, (counter4 - 7) * 0.6));
        x = Math.random();
        if (x < prob5) {
          if (x <= prob5 * (guaranteed ? 0.5 : 0.375) || gc === 1) {
            gc = 0;
            promoted++;
            guaranteed = false;
            if (promoted == 5) {
              break;
            }
          } else if (x <= prob5 * (guaranteed ? 1 : 0.75)) {
            guaranteed = false;
            gc++;
          } else {
            guaranteed = true;
            gc++;
          }
          starglitterCount += 10;
          counter5 = 1;
          counter4++;
        } else if (x < prob4 + prob5) {
          counter5++;
          counter4 = 1;
          starglitterCount += 2;
        } else {
          counter5++;
          counter4++;
        }
      }
      pullsResult[promoted]++;
      if (((k / samplesize * 100) > progress + 1) && (Date.now() - debounce) > 200) {
        debounce = Date.now();
        progress = (k / samplesize * 100) >> 0;
        postMessage({ progress: progress });
      }
    }
    return pullsResult;
  }
  return [];
}