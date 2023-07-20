import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Input, styled, InputProps } from '@mui/material'

const StyledInput = styled(Input)(() => ({
  backgroundColor: '#3A77D7',
  color: '#FFF',
  padding: '0 .5rem',
}));

export type NumberInputProp = Omit<InputProps, "onChange"> & {
  onChange: (newValue: number) => number | void,
  value?: number
  format?: boolean
};

function convertNumber(num: string, locale?: string | string[]) {
  const { format } = new Intl.NumberFormat(locale);
  const decimalSign = (/^0(.)1$/.exec(format(0.1)) as RegExpExecArray)[1];
  return +num
    .replace(new RegExp(`[^${decimalSign}\\d]`, 'g'), '')
    .replace(decimalSign, '.');
};

export default function NumberInput({ onChange, value, format = false, ...props }: NumberInputProp) {
  const { inputProps, ...restprops } = props as InputProps;

  const [val, setval] = useState(value + '');
  const placeholder = useRef(val);

  const onFocus = useCallback(() => {
    placeholder.current = val;
    setval("");
  }, [setval, placeholder.current]);

  const onBlur = useCallback(() => {
    (val === "") && setval(placeholder.current) || (val !== "") && (placeholder.current = val);
    const returnedValue = onChange(val === "" ? Number(placeholder.current) : Number(val));

    if (typeof returnedValue === 'undefined') {
      return;
    } else {
      placeholder.current = returnedValue.toString();
      setval(returnedValue.toString());
      return;
    }
  }, [onChange, val, setval, placeholder.current]);

  const changeInput = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newval = format ? convertNumber(e.target.value).toString() : e.target.value;
    const c = newval === '' ? '' : Number(newval) + '';
    setval(c);
  }, [setval]);

  useEffect(() => {
    setval(value + '')
    placeholder.current = value + '';
  }, [value, setval]);

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.key === "Enter" && onBlur();
    e.key === "ArrowUp" && val === "" && setval(placeholder.current);
    e.key === "ArrowDown" && val === "" && setval(placeholder.current);
  }, [onBlur, setval])

  return (
    <StyledInput
      value={(format && val != '') ? Number(val).toLocaleString() : val}
      inputProps={{ step: 1, type: "text", inputMode: "numeric", pattern: '[0-9,.]+', ...inputProps, style: { ...inputProps?.style, textAlign: 'center', padding: '3px 0px' } }}
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
