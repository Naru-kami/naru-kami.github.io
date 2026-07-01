import { useCallback } from 'react'
import NumberInput from '../../../components/NumberInput';
import { Card, styled } from '@mui/material';
import { useStore, WishingStore } from '../Store';
import { clamp } from '../utils';
import Slider from '../../../components/Slider';

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  borderRadius: "6px",
  overflow: "visible",
}));

export default function Pity({ max, ns }: { max: number, ns: "char" | "weap" }) {
  const [count, setStore] = useStore((store: WishingStore) => store[ns].pity);
  const handleNumber = useCallback((e: number) => {
    const c = clamp(0, e, max);
    setStore(prev => ({
      [ns]: { ...prev[ns], pity: c },
      plotdataSim: { ...prev.plotdataSim, changed: true }
    }));
    return c;
  }, [max, setStore]);

  const handeSlider = useCallback((_: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
    setStore(prev => ({
      [ns]: { ...prev[ns], pity: value as number },
      plotdataSim: { ...prev.plotdataSim, changed: true }
    }));
  }, [setStore]);

  return (
    <StyledCard elevation={4}>
      <NumberInput
        id={ns + 'Pity'}
        value={count}
        onChange={handleNumber}
        inputProps={{
          step: 1,
          min: 0,
          max: 90,
          type: 'number',
        }}
        sx={{
          letterSpacing: '1px',
          width: '54px',
          minWidth: '46px',
          height: "100%",
          m: 0, px: 0.5
        }}
      />
      <Slider
        valueLabelDisplay={"auto"}
        max={max}
        value={count}
        onChange={handeSlider}
        sx={{ mx: 2, "& .MuiSlider-valueLabel": { background: "#657692" } }}
      />
    </StyledCard>
  );
}
