import React, { useCallback } from 'react'
import Checkbox from '@mui/material/Checkbox';
import { useStore, WishingStore } from '../Store';

export default function Guarantee({ id, ns }: { id: string, ns: "char" | "weap" }) {
  const [check, setStore] = useStore((store: WishingStore) => store[ns].guaranteed);

  const updatecheck = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => {
      var t = { ...prev };
      t[ns].guaranteed = checked;
      t.plotdataSim.changed = true;
      return t;
    })
  }, []);

  return (
    <Checkbox checked={check} onChange={updatecheck} id={id} sx={{ width: '24px', height: '24px' }} />
  )
}
