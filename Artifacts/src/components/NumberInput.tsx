import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Input, styled, InputProps } from '@mui/material'

const StyledInput = styled(Input)(() => ({
  backgroundColor: '#3A77D7',
  color: '#FFF',
  padding: '0px 8px',
}));

type NumberInputProp = Omit<InputProps, "onChange"> & {
  onChange: (newValue: number) => number | void,
  value?: number,
};

export default function NumberInput({ onChange, value, ...props }: NumberInputProp) {
  const { inputProps, ...restprops } = props as InputProps;

  const [val, setval] = useState(value + '');
  const bu = useRef(val);

  const onFocus = useCallback(() => {
    bu.current = val;
    setval("");
  }, [setval, bu.current]);

  const onBlur = useCallback(() => {
    (val === "") && setval(bu.current) || (val !== "") && (bu.current = val);
    const returnedValue = onChange(val === "" ? Number(bu.current) : Number(val));

    if (typeof returnedValue === 'undefined') {
      return;
    } else {
      bu.current = returnedValue.toString();
      setval(returnedValue.toString());
      return;
    }
  }, [onChange, val, setval, bu.current]);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newval = e.target.value;
    const c = newval === '' ? '' : Number(newval) + '';
    setval(c);
  }, [setval]);

  useEffect(() => {
    setval(value + '')
    bu.current = value + '';
  }, [value, setval]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.key === "Enter" && onBlur();
    e.key === "ArrowUp" && val === "" && setval(bu.current);
    e.key === "ArrowDown" && val === "" && setval(bu.current);
  }, [onBlur, setval])

  return (
    <StyledInput
      value={val}
      inputProps={{ step: 1, type: 'number', ...inputProps, style: { ...inputProps?.style, textAlign: 'center', padding: '3px 0px' } }}
      onChange={changeInput}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onFocus={onFocus}
      onWheel={(e) => (e.target as HTMLElement).blur()}
      disableUnderline={true}
      size="small"
      {...restprops} />
  )
}
