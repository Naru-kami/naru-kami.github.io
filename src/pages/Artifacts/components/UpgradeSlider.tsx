import React, { useCallback, useState, useEffect, useRef } from "react";
import { Card, Slider, styled } from "@mui/material";
import NumberInput from "../../../components/NumberInput";
import { ArtifactStore, useStore } from "../Data/Store";

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#242734",
  height: "40px",
  borderRadius: "6px",
  backgroundImage: "none",
}));

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export default function UpgradeSlider({ id }: { id: number }) {
  const [storeSlider, setStore] = useStore((store: ArtifactStore) => store.slidervals[id]);
  const [starter] = useStore((store: ArtifactStore) => store.starter[1]);

  return (
    <NumberSlider id={id} onChange={setStore} value={storeSlider} starter={starter} />
  );
}

type NumberSliderProps = {
  onChange: (value: Partial<ArtifactStore> | ((prev: ArtifactStore) => ArtifactStore)) => void,
  value: number[],
  id: number,
  starter: number
}

function NumberSlider({ onChange, value, id, starter }: NumberSliderProps) {
  const [lowerVal, setlowerVal] = useState(value[0]);
  const [upperVal, setupperVal] = useState(value[1]);
  const [MaxVal, setMaxVal] = useState(starter != 2 ? 5 : 4);

  useEffect(() => {
    setlowerVal(value[0]);
    setupperVal(value[1]);
  }, [value])

  useEffect(() => {
    const m = starter != 2 ? 5 : 4;
    setMaxVal(m);
    setupperVal(p => Math.min(p, m));
  }, [starter]);

  const updateSlider = useCallback((event: Event, newValue: number | number[]) => {
    const [l, u] = newValue as number[];
    setlowerVal(l);
    setupperVal(u);
  }, [setlowerVal, setupperVal]);

  const commitSliderVals = useCallback((event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    onChange((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][0] = (newValue as number[])[0];
      t.slidervals[id][1] = (newValue as number[])[1];
      return t;
    });
  }, [value, onChange])

  const updatelowerVal = useCallback((e: number) => {
    const c = clamp(e, 0, upperVal);
    setlowerVal(c);
    onChange((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][0] = c;
      return t;
    });
  }, [upperVal, setlowerVal, onChange]);

  const updateupperVal = useCallback((e: number) => {
    const c = clamp(e, lowerVal, MaxVal);
    setupperVal(c);
    onChange((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][1] = c;
      return t;
    });
  }, [setupperVal, upperVal, onChange]);

  return (
    <StyledCard>
      <NumberInput
        value={lowerVal}
        onChange={updatelowerVal}
        inputProps={{ min: 0, max: upperVal, style: { width: "1.5em" } }}
        sx={{ height: "100%" }}
      />
      <Slider
        value={[lowerVal, upperVal]}
        onChange={updateSlider}
        min={0}
        max={MaxVal}
        step={1}
        onChangeCommitted={commitSliderVals}
        marks
        sx={{ mx: 2, color: "#3A77D7" }}
      />
      <NumberInput
        value={upperVal}
        onChange={updateupperVal}
        inputProps={{ min: lowerVal, max: MaxVal, style: { width: "1.5em" } }}
        sx={{ height: "100%" }}
      />
    </StyledCard>
  );
}