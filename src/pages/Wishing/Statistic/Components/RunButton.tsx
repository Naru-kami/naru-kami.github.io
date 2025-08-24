import { useCallback } from 'react'
import Button from '@mui/material/Button'
import styled from '@mui/material/styles/styled';
import green from '@mui/material/colors/green';
import { useStore, WishingStore, readStore } from '../../Store';
import CalculateIcon from '@mui/icons-material/Calculate';
import { Typography } from '@mui/material';
import { draw } from '../../utils';

const StyledButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  '&:hover': {
    backgroundColor: green[900],
  },
  height: 40,
  paddingLeft: 8,
}));

export type DataMessage = Omit<WishingStore, 'plotdataCalc' | 'plotdataCalc'>

const createWorkers = (store: WishingStore, setData: (value: Partial<WishingStore> | ((prev: WishingStore) => WishingStore)) => void, ydata: number[]) => {

  var worker = new Worker(new URL('../Data/MainWorker.ts', import.meta.url), { type: "module" });

  worker.postMessage({
    char: store.char,
    weap: store.weap,
    mode: store.mode,
  });

  worker.onmessage = (event: MessageEvent<{ pullsResult: number[] }>) => {
    const { data } = event;
    data.pullsResult.forEach((e: number, i: number) => {
      ydata[i] = e;
    });

    setData(prev => {
      var t = { ...prev };
      t.plotdataCalc.x = draw(ydata, prev.weap.enabled && !prev.char.enabled && prev.mode == 'fixed' ? 1 : 0);
      t.plotdataCalc.y = [...ydata];
      return t;
    });

    worker.terminate();
  };

}

export default function RunButton() {
  const [_, setStore] = useStore(store => store.plotdataCalc);
  const store = readStore(store => store);

  const pop = useCallback(() => {
    var ydata: number[] = (store.mode == 'distribution' ? new Array(
      (store.char.enabled ? (90 * (2 * store.char.goal + 2 - (+store.char.guaranteed)) - store.char.pity) : 0) +
      (store.weap.enabled ? (77 * 2 * store.weap.goal - store.weap.pity) : 0) + 1
    ).fill(0) : new Array(
      (+store.char.enabled) * 7 + (+store.weap.enabled) * 5
    ).fill(0));
    createWorkers(store, setStore, ydata);
  }, [store, setStore]);

  return (
    <StyledButton variant="contained" onClick={pop} disabled={!store.char.enabled && !store.weap.enabled}>
      <CalculateIcon />
      <Typography variant='body1' letterSpacing={1} sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
        <strong>
          Calculate
        </strong>
      </Typography>
    </StyledButton>
  )
}
