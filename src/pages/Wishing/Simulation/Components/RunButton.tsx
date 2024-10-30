import React, { useCallback, useEffect, useMemo } from 'react'
import { Button, Card, Divider, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { green, orange } from '@mui/material/colors';
import { useStore, WishingStore } from '../../Store';
import { draw } from '../../utils';
import CalculateIcon from '@mui/icons-material/Calculate';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  '&:hover': {
    backgroundColor: green[900],
  },
  height: '40px',
  paddingLeft: 8,
  gap: 8
}));

export type DataMessage = Omit<WishingStore, 'plotdataSim' | 'plotdataCalc'>;

var workers: Worker[] = [];

const createWorkers = (store: WishingStore, setData: (value: Partial<WishingStore> | ((prev: WishingStore) => WishingStore)) => void, ydata: number[]) => {
  if (workers.length > 0) {
    workers.forEach(worker => worker.terminate());
    workers = [];
    setData(prev => {
      var t = { ...prev };
      t.plotdataSim.progress = 100;
      return t;
    })
    return;
  }

  const N = store.threads;
  var workerCount = 0;

  workers = new Array(N).fill(NaN).map((e: number, i) => {
    if (!i)
      return new Worker(new URL('../Data/MainWorker.ts', import.meta.url));
    else
      return new Worker(new URL('../Data/Worker.ts', import.meta.url))
  });

  workers.forEach((worker: Worker, index) => {
    if (!index)
      worker.postMessage({
        char: { ...store.char },
        weap: { ...store.weap },
        starglitter: { ...store.starglitter },
        mode: store.mode,
        samplesize: (store.samplesize - store.samplesize % store.threads) / store.threads + store.samplesize % store.threads
      });
    else
      worker.postMessage({
        char: { ...store.char },
        weap: { ...store.weap },
        starglitter: { ...store.starglitter },
        mode: store.mode,
        samplesize: (store.samplesize - store.samplesize % store.threads) / store.threads
      });
  });

  workers.forEach((worker: Worker) => {
    worker.onmessage = (event: MessageEvent<{ progress: number | undefined, pullsResult: number[] }>) => {
      if (event.data.progress) {
        setData(prev => {
          var t = { ...prev };
          t.plotdataSim.progress = event.data.progress as number;
          return t;
        });
        return;
      }
      const { data } = event;
      data.pullsResult.forEach((e: number, i: number) => {
        ydata[i] += e;
      });
      workerCount++;
      if (workerCount == N) {
        setData(prev => {
          var t = { ...prev };
          t.plotdataSim.x = draw(ydata, store.mode == 'fixed' && store.weap.enabled ? 1 : 0);
          var placeholder: number[] = [];
          ydata.forEach((e, j) => {
            placeholder[j] = e + (typeof t.plotdataSim.y[j] == 'number' ? t.plotdataSim.y[j] : 0)
          });
          t.plotdataSim.y = [...placeholder];
          t.plotdataSim.progress = 100;
          return t;
        });
        workerCount = 0;
        ydata = [];
        workers.forEach(worker => worker.terminate());
        workers = [];
      }
    };
  });
}

function SimulateButton() {
  const [store, setStore] = useStore(store => store);

  const pop = useCallback(() => {
    var ydata: number[] = (store.mode == 'distribution' ? new Array(
      (store.char.enabled ? (90 * (2 * store.char.goal + 2 - (+store.char.guaranteed)) - store.char.pity) : 0) +
      (store.weap.enabled ? (77 * 2 * store.weap.goal - store.weap.pity) : 0) + 1
    ).fill(0) : new Array(
      (+store.char.enabled) * 7 + (+store.weap.enabled) * 5 + 1
    ).fill(0));

    setStore(prev => {
      var t = { ...prev };
      t.plotdataSim.progress = 0;
      if (t.plotdataSim.changed) {
        t.plotdataSim.changed = false;
        t.plotdataSim.x = [];
        t.plotdataSim.y = [];
      }
      return t;
    });
    createWorkers(store, setStore, ydata);
  }, [store, setStore]);

  useEffect(() => {
    setStore(prev => {
      var t = { ...prev };
      t.plotdataSim.progress = 100;
      return t;
    });
    return setStore(prev => {
      var t = { ...prev };
      t.plotdataSim.progress = 100;
      return t;
    });
  }, [])

  const warn = useMemo(() => {
    return store.plotdataSim.progress !== 100 ? { backgroundColor: orange[600], '&:hover': { backgroundColor: orange[800] } } : {}
  }, [store.plotdataSim.progress]);

  return (
    <StyledButton onClick={pop} disabled={(!store.char.enabled && !store.weap.enabled)} sx={{ ...warn }}>
      <CalculateIcon />
      <Typography variant='body1' letterSpacing={1} lineHeight={1} fontWeight={600} >
        {store.plotdataSim.progress !== 100 ? 'Terminate' : store.plotdataSim.y.length === 0 && "Simulate" || "More Samples"}
      </Typography>
    </StyledButton >
  )
}

function Threads() {
  const [threads, setStore] = useStore(store => store.threads);
  const handleThreads = useCallback((event: SelectChangeEvent<number>) => {
    setStore({ ['threads']: event.target.value as number })
  }, [setStore]);

  return (
    <Card elevation={4}>
      <FormControl size='small' sx={{ minWidth: 50, height: '100%' }}>
        <Select value={threads} onChange={handleThreads}>
          <ListSubheader sx={{ backgroundColor: 'transparent', color: '#fff' }}>
            <Typography variant='body2' sx={{ py: 1 }}>
              Workload will be split among threads. <br />
              More Threads will speed up execution at the cost of higher CPU load.
            </Typography>
          </ListSubheader>
          <Divider sx={{ my: 1 }} />
          {[10, 9, 8, 7, 6, 5, 4, 3, 2, 1].map(e => {
            return <MenuItem key={e} value={e}> {e} Threads </MenuItem>
          })}
        </Select>
      </FormControl>
    </Card>
  );
}

export default function RunButton() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <SimulateButton />
      <Threads />
    </div>
  );
}
