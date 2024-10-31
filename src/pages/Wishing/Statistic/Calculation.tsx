import { useCallback } from 'react';
import RunButton from './Components/RunButton';
import Chart from './Components/chart';
import { Button, Card, Grid, styled, Tooltip, Typography } from '@mui/material';
import CachedIcon from '@mui/icons-material/Cached';
import CharacterInput from '../InputCards/CharacterInput';
import StorageResetter from '../StoreResetter';
import { useStore } from '../Store';
import { blue } from '@mui/material/colors';
import WeaponInput from '../InputCards/WeaponInput';
import Modebar from '../InputCards/Modebar';
import Tabl from './Components/Tabl';
import CurrencySwitcher from '../InputCards/CurrencySwitcher';

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

export default function Calculation() {
  return (
    <Grid container spacing={2} sx={{ maxWidth: '2500px' }}>
      <Grid item xs={12}>
        <Modebar approach='calculation' />
      </Grid>
      <Grid item sm={12} xl={4}>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12} xl={12}>
            <CharacterInput />
          </Grid>
          <Grid item md={6} xs={12} xl={12}>
            <WeaponInput />
          </Grid>
          <Grid item xs={12}>
            <Card elevation={2} sx={{ p: 1, color: '#FFFFFF88' }}>
              Starglitter is not supported
            </Card>
          </Grid>
        </Grid >
        <Card elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 3.5, mb: 1, p: 1 }}>
          <RunButton />
          <CurrencySwitcher sx={{ mr: 'auto' }} />
          <StorageResetter />
        </Card>
      </Grid>
      <Grid item xs={12} xl={8} >
        <ModeComponent />
      </Grid>
    </Grid>
  )
}

function Switcher() {
  const [ydata] = useStore(store => store.plotdataCalc.y);
  const [cum, setStore] = useStore(store => store.plotdataCalc.cumulative);

  const handleDistribution = useCallback(() => {
    setStore(prev => {
      var t = { ...prev };
      t.plotdataCalc.cumulative = !t.plotdataCalc.cumulative;
      return t;
    });
  }, [ydata])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingInline: '8px', paddingBlock: '16px' }}>
      <Tooltip title={<Typography variant='body2'>Switch to {cum && 'density' || 'cumulative'} distribution</Typography>} arrow placement='top'>
        <StyledButton onClick={handleDistribution}>
          <CachedIcon sx={{ transform: 'rotate(75deg)' }} />
        </StyledButton>
      </Tooltip>
    </div>
  );
}

function ModeComponent() {
  const [mode] = useStore(store => store.mode);
  return (
    <>
      {mode == 'fixed' && <Tabl />}
      <Chart />
      {mode == 'distribution' && <Switcher />}
    </>
  );
}
