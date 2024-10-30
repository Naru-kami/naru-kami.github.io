import React, { useCallback } from 'react';
import { Button, Card, Typography, styled, Tooltip, Box } from '@mui/material';
import { blue } from '@mui/material/colors';
import CachedIcon from '@mui/icons-material/Cached';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import NumberInput from '../../../../components/NumberInput';
import { useStore, WishingStore } from '../../Store';

const StyledButton = styled(Button)(({ theme }) => ({
  lineHeight: 0,
  minWidth: '24px',
  marginLeft: 'auto',
  padding: 4,
  color: theme.palette.getContrastText(blue[700]),
  backgroundColor: blue[700],
  '&:hover': {
    backgroundColor: blue[900],
  },
  aspectRatio: '1'
}));

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  borderRadius: "6px",
}));

function SampleInterval() {
  const [sample, setStore] = useStore((store: WishingStore) => store.samplesize);

  const onMinus = useCallback(() => {
    setStore(prev => {
      var t = { ...prev };
      t.samplesize = Math.max(t.samplesize - 500000, 0);
      return t;
    });
  }, [setStore]);

  const onPlus = useCallback(() => {
    setStore(prev => {
      var t = { ...prev };
      t.samplesize = Math.max(t.samplesize + 500000, 0);
      return t;
    });
  }, [setStore]);

  const handleSample = useCallback((newVal: number) => {
    const c = Math.max(newVal, 0);
    setStore(prev => {
      var t = { ...prev };
      t.samplesize = c;
      return t;
    });
    return c;
  }, [setStore]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', maxWidth: 1102.22, mx: 'auto' }}>
      <Typography>
        Sample interval:
      </Typography>
      <StyledCard elevation={4} sx={{ backgroundColor: sample >= 1e8 && '#d32f2fbb' || sample >= 1e7 && '#f57c00aa' || undefined }}>
        <StyledButton onClick={onMinus} sx={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
          <RemoveIcon />
        </StyledButton>
        <NumberInput value={sample}
          format
          onChange={handleSample}
          sx={{
            mx: 1, minWidth: '100px',
            width: (sample.toString().length + 1) * 12 + 'px',
            backgroundColor: 'transparent'
          }}
        />
        <StyledButton onClick={onPlus} sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
          <AddIcon />
        </StyledButton>
      </StyledCard>
      {
        sample >= 1e8 && <StyledCard sx={{ flex: 1, backgroundColor: '#d32f2fbb', p: 0.5, minWidth: 'max-content' }}>
          <ErrorOutlineIcon />
          <Typography variant='body2' sx={{ px: 1 }}>
            Such high sample intervals are not recommended. Only do this if you need to.
          </Typography>
        </StyledCard> ||
        sample >= 1e7 && <StyledCard sx={{ flex: 1, backgroundColor: '#f57c00aa', p: 0.5, minWidth: 'max-content' }}>
          <ErrorOutlineIcon />
          <Typography variant='body2' sx={{ px: 1 }}>
            High sample intervals may take a long execution time
          </Typography>
        </StyledCard>
      }
    </Box>
  )
}

function ShowSize() {
  const [ydata] = useStore((store: WishingStore) => store.plotdataSim.y);
  const [cum, setStore] = useStore((store: WishingStore) => store.plotdataSim.cumulative);
  const [mode] = useStore((store: WishingStore) => store.mode);

  const handleDistribution = useCallback(() => {
    setStore(prev => {
      var t = { ...prev };
      t.plotdataSim.cumulative = !t.plotdataSim.cumulative;
      return t;
    });
  }, [ydata])

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
      <Typography fontSize={14} >
        Sample size: {new Intl.NumberFormat().format(ydata.reduce((p, c) => p + c, 0))}
      </Typography>
      {mode == 'distribution' && <Tooltip title={<Typography variant='body2'>Switch to {cum && 'density' || 'cumulative'} distribution</Typography>} arrow placement='top'>
        <StyledButton onClick={handleDistribution}>
          <CachedIcon sx={{ transform: 'rotate(75deg)' }} />
        </StyledButton>
      </Tooltip>}
    </Box>
  );
}

export default function SampleSize() {
  return (
    <Box sx={{ maxWidth: 1102.22, mx: 'auto' }}>
      <ShowSize />
      <SampleInterval />
    </Box>
  )
}
