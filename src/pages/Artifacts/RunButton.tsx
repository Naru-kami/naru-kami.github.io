import { useCallback, useRef } from 'react'
import { Button, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import CalculateIcon from '@mui/icons-material/Calculate';
import { useStore, readStore, ArtifactStore } from './Data/Store';

const RunButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(green[700]),
  backgroundColor: green[700],
  '&:hover': {
    backgroundColor: green[900],
  },
  height: '40px'
}));

function createWorkers(store: ArtifactStore, setData: (value: Partial<ArtifactStore> | ((prev: ArtifactStore) => ArtifactStore)) => void) {
  const worker = new Worker(new URL("./Data/MainWorker.ts", import.meta.url), { type: "module" });

  worker.postMessage({
    mainstats: store.mainstats,
    substats: store.substats,
    supplementary: store.supplementary,
    substatBounds: store.substatBounds,
  } satisfies Omit<ArtifactStore, "plotdata" | "chances" | "unit">);

  worker.onmessage = (event: MessageEvent<{ chances: ArtifactStore["chances"], plotdata: ArtifactStore["plotdata"] }>) => {
    const { data } = event;

    setData(p => {
      if (!(p.supplementary[2] in [0, 0, 0, 0])) {
        p.unit = 2;
      }
      return { ...p, ...data }
    });

    worker.terminate();
  }
}

export default function Artichance() {
  const [_, setStore] = useStore(store => store.plotdata);
  const states = readStore(store => store);

  const calc = useCallback(() => {
    createWorkers(states, setStore);
  }, [states, setStore]);

  return (
    <RunButton variant="contained" onClick={calc} sx={{ pl: 1 }}>
      <CalculateIcon />
      <Typography variant='body1' letterSpacing={1} sx={{ display: 'flex', alignItems: 'center', pl: 1 }}>
        <strong>calculate</strong>
      </Typography>
    </RunButton>
  )
}
