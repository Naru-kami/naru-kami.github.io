import React from 'react'
import RunButton from './Components/RunButton';
import Chart from './Components/chart';
import { Grid } from '@mui/material';
import SampleSize from './Components/SampleSize';
import CharacterInput from '../InputCards/CharacterInput';
import StorageResetter from '../StoreResetter';
import WeaponInput from '../InputCards/WeaponInput';
import Starglitter from '../InputCards/Starglitter';
import Modebar from '../InputCards/Modebar';
import Tabl from './Components/Tabl';
import { useStore } from '../Store';

export default function Simulation() {
  return (
    <Grid container spacing={2} sx={{ maxWidth: '2500px' }}>
      <Grid item xs={12}>
        <Modebar approach='simulation' />
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
            <Starglitter />
          </Grid>
        </Grid >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginTop: "24px", marginBottom: "8px" }}>
          <RunButton />
          <StorageResetter />
        </div>
      </Grid>

      <Grid item xs={12} xl={8}>
        <ModeComponent />
      </Grid>
    </Grid>
  )
}

function ModeComponent() {
  const [mode] = useStore(store => store.mode);
  return (
    <>
      {mode == 'fixed' && <Tabl />}
      <Chart />
      <SampleSize />
    </>
  );
}
