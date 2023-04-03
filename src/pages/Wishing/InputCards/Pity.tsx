import React, { useCallback } from 'react'
import NumberInput from '../../../components/NumberInput';
import { Slider, Card, styled } from '@mui/material';
import { useStore, WishingStore } from '../Store';
import { clamp } from '../utils';

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  backgroundColor: "#242734",
  borderRadius: "6px",
  backgroundImage: "none",
}));

export default function Pity({ max, ns }: { max: number, ns: "char" | "weap" }) {
  const [count, setStore] = useStore((store: WishingStore) => store[ns].pity);
  const handleNumber = useCallback((e: number) => {
    const c = clamp(e, 0, max);
    setStore(prev => {
      var t = { ...prev };
      t[ns].pity = c;
      t.plotdataSim.changed = true;
      return t;
    });
    return c;
  }, []);

  const handeSlider = useCallback((event: Event, value: number | number[]) => {
    setStore(prev => {
      var t = { ...prev };
      t[ns].pity = value as number;
      t.plotdataSim.changed = true;
      return t;
    });
  }, []);

  return (
    <StyledCard>
      <NumberInput
        id={ns + 'Pity'}
        value={count}
        onChange={handleNumber}
        inputProps={{
          step: 1,
          min: 0,
          max: 90,
          type: 'number',
          style: {
            padding: '3px 0px'
          }
        }}
        sx={{
          letterSpacing: '1px',
          width: '64px',
          minWidth: '46px',
          height: "100%",
          m: 0, px: 0.5
        }}
      />
      <Slider
        max={max}
        value={count}
        onChange={handeSlider}
        sx={{ mx: 2 }}
      />
    </StyledCard>
  );
}
