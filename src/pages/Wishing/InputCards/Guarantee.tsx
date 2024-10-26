import React, { useCallback } from 'react'
import { SxProps, Theme, Checkbox } from '@mui/material';
import { useStore, WishingStore } from '../Store';

export default function Guarantee({ id, ns, sx }: { id?: string, sx?: SxProps<Theme>, ns: "char" | "weap" }) {
  const [check, setStore] = useStore((store: WishingStore) => store[ns].guaranteed);

  const updatecheck = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => {
      var t = { ...prev };
      t[ns].guaranteed = checked;
      t.plotdataSim.changed = true;
      return t;
    })
  }, [setStore]);

  return (
    <Checkbox checked={check} onChange={updatecheck} id={id} sx={{ width: '24px', height: '24px' }} />
  )
}
