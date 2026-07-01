import { useCallback, useEffect, useState } from "react"
import { Slider as MuiSlider, SliderProps as MuiSliderProps } from "@mui/material"

type SliderProps = {
    onChange: (event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => void,
    value: number | number[],
} & Omit<MuiSliderProps, "onChange" | "value">

export default function Slider({ onChange, value, ...restProps }: SliderProps) {
    const [val, setVal] = useState(value);

    const handleChange = useCallback((_: Event, value: number | number[]) => {
        setVal(value);
    }, []);

    const handleChangeComitted = useCallback((event: Event | React.SyntheticEvent<Element, Event>, value: number | number[]) => {
        onChange?.(event, value);
    }, [onChange]);

    useEffect(() => {
        setVal(value)
    }, [value])

    return <MuiSlider
        value={val}
        onChange={handleChange}
        onChangeCommitted={handleChangeComitted}
        {...restProps}
    />
}