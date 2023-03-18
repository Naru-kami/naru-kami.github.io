import React, { useCallback, useState, useEffect } from "react";
import { Card, Slider, styled } from "@mui/material";
import NumberInput from "../../../components/NumberInput";
import { ArtifactStore, useStore } from "../Data/Store";

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#242734",
  boxShadow: "5px",
  height: "40px",
  borderRadius: "6px",
  backgroundImage: "none",
}));

function clamp(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export default function UpgradeSlider({ id, MaxVal = 5 }: { id: number, MaxVal?: number }) {

  const [StoreSlider0, setStore] = useStore((store: ArtifactStore) => store.slidervals[id][0]);
  const [StoreSlider1] = useStore((store: ArtifactStore) => store.slidervals[id][1]);

  const [lowerVal, setlowerVal] = useState(StoreSlider0);
  const [upperVal, setupperVal] = useState(StoreSlider1);

  useEffect(() => {
    setlowerVal(StoreSlider0);
    setupperVal(StoreSlider1);
  }, [StoreSlider0, StoreSlider1])

  const updateSlider = useCallback((event: Event, newValue: number | number[]) => {
    const [l, u] = newValue as number[];
    setlowerVal(l);
    setupperVal(u);
  }, [setlowerVal, setupperVal]);

  const commitSliderVals = useCallback((event: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    setStore((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][0] = (newValue as number[])[0];
      t.slidervals[id][1] = (newValue as number[])[1];
      return t;
    });
  }, [StoreSlider0, StoreSlider1, setStore])

  const updatelowerVal = useCallback((e: number) => {
    const c = clamp(e, 0, upperVal);
    setlowerVal(c);
    setStore((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][0] = c;
      return t;
    });
  }, [upperVal, setlowerVal, setStore]);

  const updateupperVal = useCallback((e: number) => {
    const c = clamp(e, lowerVal, MaxVal);
    setupperVal(c);
    setStore((prev: ArtifactStore) => {
      var t = { ...prev };
      t.slidervals[id][1] = c;
      return t;
    });
  }, [setupperVal, upperVal, setStore]);

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
