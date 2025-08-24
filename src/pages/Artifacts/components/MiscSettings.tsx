import { Select, MenuItem, InputLabel, FormControl, styled, SelectChangeEvent, Card, Box, Slider, Typography, Divider, Grid } from '@mui/material';
import { readStore, useStore } from '../Data/Store';
import { useCallback, useId } from 'react';
import NumberInput from '../../../components/NumberInput';

const StyledSelect = styled(Select)(({ theme }) => ({
  color: '#FFF',
  margin: 8,
  boxShadow: theme.shadows[2],
  background: 'hsl(230, 65%, 7%) linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
  "& .MuiSvgIcon-root": { color: "#CCC" }
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  height: '40px',
  margin: 8,
  borderRadius: '4px',
  background: 'hsl(230, 65%, 7%) linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))',
}));


function DropSource() {
  const [source, setStates] = useStore(store => store.supplementary[2]);

  const changeSource = useCallback((e: SelectChangeEvent<unknown>) => {
    setStates(p => {
      const value = Number(e.target.value);
      if (value === 4) {
        p.supplementary[0] = 2;
      }
      p.supplementary[2] = value;
      return { ...p };
    })
  }, [setStates]);

  return (
    <FormControl sx={{ width: "100%" }} size="small">
      <InputLabel id="source" sx={{ m: 1, color: "#FFF" }}>Drop Source</InputLabel>
      <StyledSelect value={source} onChange={changeSource} label="Drop Source" labelId="source">
        <MenuItem value={0} sx={{ color: "#FFF" }}>Stygian Onslaught</MenuItem>
        <MenuItem value={1} sx={{ color: "#FFF" }}>Domain</MenuItem>
        <MenuItem value={2} sx={{ color: "#FFF" }}>Normal Bosses</MenuItem>
        <MenuItem value={3} sx={{ color: "#FFF" }}>Weekly Bosses</MenuItem>
        <MenuItem value={4} sx={{ color: "#FFF" }}>Strongbox</MenuItem>
        <MenuItem value={5} sx={{ color: "#FFF" }}>Domain Reliquary</MenuItem>
      </StyledSelect>
    </FormControl>
  );
}

function ArtifactSet() {
  const [set, setStates] = useStore(store => store.supplementary[0]);
  const [source] = useStore(store => store.supplementary[2]);

  const changeSet = useCallback((event: SelectChangeEvent<unknown>) => {
    setStates(prev => {
      const temp = { ...prev };
      temp.supplementary[0] = event.target.value as number;
      return temp;
    });
  }, [setStates]);

  return (
    <FormControl sx={{ width: '100%' }} size="small">
      <InputLabel id="set" sx={{ m: 1, color: "#FFF" }}>Set option</InputLabel>
      <StyledSelect value={set} onChange={changeSet} label="Set option">
        <MenuItem value={2} sx={{ color: '#FFF' }}> On-Set Artifact </MenuItem>
        {source !== 4 && <MenuItem value={1} sx={{ color: '#FFF' }}> Off-Set Artifact </MenuItem>}
      </StyledSelect>
    </FormControl>
  );
}

function InitialAffixCount() {
  const [misc, setStates] = useStore(store => store.supplementary[1]);

  const changeStarting = useCallback((event: SelectChangeEvent<unknown>) => {
    setStates(prev => {
      var temp = { ...prev };
      temp.supplementary[1] = event.target.value as number;
      return temp;
    });
  }, [setStates]);

  return (
    <FormControl size="small" fullWidth>
      <InputLabel id="starting" sx={{ m: 1, color: "#FFF" }}>Initial affix count</InputLabel>
      <StyledSelect value={misc} onChange={changeStarting} label="Initial affix count">
        <MenuItem value={0} sx={{ color: '#FFF' }}> 3 or 4 </MenuItem>
        <MenuItem value={1} sx={{ color: '#FFF' }}> 4 </MenuItem>
        <MenuItem value={2} sx={{ color: '#FFF' }}> 3 </MenuItem>
      </StyledSelect>
    </FormControl>
  )
}

function ResinPerDay() {
  const id = useId();
  const [resinPerDay, setStore] = useStore(store => store.supplementary[3]);
  const [unit] = useStore(store => store.unit);

  const updateRpD = useCallback((e: number) => {
    const target = [180, 240, 300, 360, 420, 480, 540].reduce((p, c) => (Math.abs(c - e) <= Math.abs(p - e)) && c || p, 180);
    setStore(p => {
      var t = { ...p };
      t.supplementary[3] = target;
      return t;
    });
    return target;
  }, [setStore]);

  const updateRpDslider = useCallback((e: Event, value: number | number[]) => {
    setStore(p => {
      var t = { ...p };
      t.supplementary[3] = value as number;
      return t;
    });
  }, [setStore]);

  return (
    !unit && <StyledCard variant="outlined">
      <NumberInput
        value={resinPerDay}
        onChange={updateRpD}
        inputProps={{ step: 60, min: 180, max: 540, style: { width: 32 }, id }}
        sx={{ borderRadius: "4px 0px 0px 4px", gap: 1 }}
        startAdornment={<label htmlFor={id}>
          <Typography variant='body2' sx={{ whiteSpace: 'nowrap', width: 100, cursor: "text" }}>
            Resin per day:
          </Typography>
          <Divider orientation="vertical" flexItem />
        </label>}
      />
      <Slider
        value={resinPerDay}
        onChange={updateRpDslider}
        step={60}
        min={180}
        max={540}
        marks
        sx={{ m: "auto 1rem" }}
        getAriaLabel={() => 'Resin Per Day Slider'} />
    </StyledCard>
  )
}

export default function MiscSettings() {
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} sm={4} laptop={2} xl={4}>
        <DropSource />
      </Grid>
      <Grid item xs={12} sm={4} laptop={2} xl={4}>
        <ArtifactSet />
      </Grid>
      <Grid item xs={12} sm={4} laptop={2} xl={4}>
        <InitialAffixCount />
      </Grid>
      <Grid item xs={12} laptop={6} xl={12}>
        <ResinPerDay />
      </Grid>
    </Grid>
  );
}

