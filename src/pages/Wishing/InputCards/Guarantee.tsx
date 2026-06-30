import React, { useCallback } from 'react'
import { Checkbox } from '@mui/material';
import { useStore, WishingStore } from '../Store';

export default function Guarantee({ id, ns }: { id?: string, ns: "char" | "weap" }) {
  const [check, setStore] = useStore((store: WishingStore) => store[ns].guaranteed);

  const updatecheck = useCallback((_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => ({
      [ns]: { ...prev[ns], guaranteed: checked },
      plotdataSim: { ...prev.plotdataSim, changed: true }
    }))
  }, [setStore]);

  return (
    <Checkbox checked={check} onChange={updatecheck} id={id} sx={{ width: '24px', height: '24px' }} />
  )
}
