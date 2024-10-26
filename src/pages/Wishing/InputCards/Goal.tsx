import { useMemo, useCallback, useEffect } from 'react';
import NumberInput from '../../../components/NumberInput';
import { Slider, Card, styled, Typography } from '@mui/material';
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

export default function Goal({ adornment, max, ns }: { adornment: string, max: number, ns: "char" | "weap" }) {
  const [goal, setStore] = useStore((store: WishingStore) => store[ns].goal);
  const [mode] = useStore((store: WishingStore) => store.mode);
  const _max = useMemo(() => mode == 'fixed' && (ns == 'char' ? (180 * (max + 1)) : (231 * max)) || max, [mode]);
  const _min = useMemo(() => mode == 'distribution' && ns == 'weap' ? 1 : 0, [mode]);

  useEffect(() => {
    const c = clamp(goal, _min, _max);
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = c;
      // t.plotdataSim.changed = true;
      return t;
    });
  }, [mode, _min, _max])

  const handleNumber = useCallback((e: number) => {
    const c = clamp(e, _min, _max);
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = c;
      t.plotdataSim.changed = true;
      return t;
    });
    return c;
  }, [mode, setStore]);

  const handeSlider = useCallback((event: Event, value: number | number[]) => {
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = value as number;
      t.plotdataSim.changed = true;
      return t;
    });
  }, [setStore]);

  return (
    <StyledCard>
      <NumberInput
        id={ns + 'Goal'}
        value={goal}
        onChange={handleNumber}
        startAdornment={
          <label htmlFor={ns + 'Goal'} style={{ cursor: 'text' }}>
            {mode == 'fixed' && ' ' || adornment}
          </label>
        }
        inputProps={{
          step: 1,
          min: _min, max: _max,
          type: 'number',
          style: { width: mode == 'fixed' ? 'auto' : '23px', marginInline: '-5px' },
        }}
        sx={{
          width: '54px',
          minWidth: '46px',
          height: "100%",
          m: 0, px: 0.5,
          justifyContent: 'center',
        }}
      />
      <Slider
        max={_max}
        min={_min}
        marks={mode == 'distribution'}
        value={goal}
        onChange={handeSlider}
        sx={{ mx: 2 }}
      />
    </StyledCard>
  )
}
