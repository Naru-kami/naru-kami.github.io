import { useMemo, useCallback, useEffect, useId } from 'react';
import NumberInput from '../../../components/NumberInput';
import { Slider, Card, styled } from '@mui/material';
import { useStore, WishingStore } from '../Store';
import { clamp } from '../utils';
import { userPrimogemSwitcher } from './CurrencySwitcher';

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  borderRadius: "6px",
}));

export default function Goal({ adornment, max, ns }: { adornment: string, max: number, ns: "char" | "weap" }) {
  const [goal, setStore] = useStore((store: WishingStore) => store[ns].goal);
  const [mode] = useStore((store: WishingStore) => store.mode);
  const [usePrimogems] = userPrimogemSwitcher();
  const id = useId();
  const _max = useMemo(() => mode == 'fixed' ? (usePrimogems ? 160 : 1) * (ns == 'char' ? (2 * 90 * (max + 1)) : (2 * 77 * max)) : max, [mode, usePrimogems, ns, max]);
  const _min = useMemo(() => mode == 'distribution' && ns == 'weap' ? 1 : 0, [mode, ns]);

  useEffect(() => {
    const c = clamp(_min, goal, _max);
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = c;
      return t;
    });
  }, [mode, _min, _max])

  const handleNumber = useCallback((e: number) => {
    const c = clamp(_min, e, _max);
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = c / (mode == 'fixed' && usePrimogems ? 160 : 1);
      t.plotdataSim.changed = true;
      return t;
    });
    return c;
  }, [mode, setStore, usePrimogems, _min, _max]);

  const handeSlider = useCallback((event: Event, value: number | number[]) => {
    setStore(prev => {
      var t = { ...prev };
      t[ns].goal = (value as number) / (mode == 'fixed' && usePrimogems ? 160 : 1);
      t.plotdataSim.changed = true;
      return t;
    });
  }, [setStore, mode, usePrimogems]);

  return (
    <StyledCard elevation={4}>
      <NumberInput
        id={id}
        value={goal * (mode == 'fixed' && usePrimogems ? 160 : 1)}
        onChange={handleNumber}
        startAdornment={
          <label htmlFor={id} style={{ cursor: 'text' }}>
            {mode == 'fixed' && ' ' || adornment}
          </label>
        }
        inputProps={{
          step: mode == 'fixed' && usePrimogems ? 160 : 1,
          min: _min, max: _max,
          type: 'number',
          style: { width: mode == 'fixed' ? 'auto' : '23px', marginInline: '-5px' },
        }}
        sx={{
          width: mode == 'fixed' && usePrimogems ? '80px' : '54px',
          minWidth: '46px',
          height: "100%",
          m: 0, px: 0.5,
          justifyContent: 'center',
        }}
      />
      <Slider
        max={_max} min={_min}
        step={mode == 'fixed' && usePrimogems ? 160 : 1}
        marks={mode == 'distribution'}
        value={goal * (mode == 'fixed' && usePrimogems ? 160 : 1)}
        onChange={handeSlider}
        sx={{ mx: 2 }}
      />
    </StyledCard>
  )
}
