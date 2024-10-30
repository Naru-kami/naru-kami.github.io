import React, { useCallback } from 'react'
import { Card, Divider, Slider, styled, Typography } from '@mui/material';
import NumberInput from '../../../components/NumberInput';
import { ArtifactStore, useStore } from '../Data/Store';

const StyledPaper = styled(Card)(({ theme }) => ({
  marginBlock: 5,
  borderRadius: 6,
  outline: '1px solid ' + theme.palette.divider,
  outlineOffset: -1,
}));

const StyledSlider = styled(Slider)(() => ({
  margin: "auto 1rem",
}));

const StyledCard = styled(Card)(() => ({
  display: 'flex',
  height: '44px',
  margin: '0.75rem',
  borderRadius: '4px',
}));

function ResinPerArtifact() {
  const [RpA, setStore] = useStore((store: ArtifactStore) => store.resin[0]);

  const updateRpA = useCallback((e: number) => {
    const c = (e <= 29) && 20 || ((e >= 30) && 40 || e);
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.resin[0] = c;
      return t;
    });
    return c;
  }, [setStore]);

  const updateRpAslider = useCallback((event: Event, value: number | number[]) => {
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.resin[0] = value as number;
      return t;
    });
  }, [setStore]);

  return (
    <StyledCard elevation={4} >
      <label style={{ display: 'flex' }}>
        <NumberInput
          value={RpA}
          onChange={updateRpA}
          inputProps={{ step: 20, min: 20, max: 40, style: { width: 32 } }}
          sx={{ my: '1px', borderRadius: "4px 0px 0px 4px", gap: 1 }}
          startAdornment={<>
            <Typography variant='body2' sx={{ whiteSpace: 'nowrap', width: '116px' }}>
              Resin per Artifact:
            </Typography>
            <Divider orientation="vertical" flexItem />
          </>}
        />
      </label>
      <StyledSlider
        value={RpA}
        onChange={updateRpAslider}
        step={20}
        min={20}
        max={40}
        marks
        getAriaLabel={() => 'Resin Per Artifact'} />
    </StyledCard>
  )
}

function ResinPerDay() {
  const [RpD, setStore] = useStore((store: ArtifactStore) => store.resin[1]);

  const updateRpD = useCallback((e: number) => {
    const target = [180, 240, 300, 360, 420, 480, 540].reduce((p, c) => (Math.abs(c - e) <= Math.abs(p - e)) && c || p, 180);
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.resin[1] = target;
      return t;
    });
    return target;
  }, [setStore]);

  const updateRpDslider = useCallback((event: Event, value: number | number[]) => {
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.resin[1] = value as number;
      return t;
    });
  }, [setStore]);

  return (
    <StyledCard elevation={4}>
      <label style={{ display: 'flex' }}>
        <NumberInput
          value={RpD}
          onChange={updateRpD}
          inputProps={{ step: 60, min: 180, max: 540, style: { width: 32 } }}
          sx={{ my: '1px', borderRadius: "4px 0px 0px 4px", gap: 1 }}
          startAdornment={<>
            <Typography variant='body2' sx={{ whiteSpace: 'nowrap', width: '116px' }}>
              Resin per day:
            </Typography>
            <Divider orientation="vertical" flexItem />
          </>}
        />
      </label>
      <StyledSlider
        value={RpD}
        onChange={updateRpDslider}
        step={60}
        min={180}
        max={540}
        marks
        getAriaLabel={() => 'Resin Per Day Slider'} />
    </StyledCard>
  )
}

export default function Resin() {
  return (
    <StyledPaper elevation={2}>
      <ResinPerArtifact />
      <ResinPerDay />
    </StyledPaper>
  )
}
