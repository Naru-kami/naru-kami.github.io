import React, { useEffect, useCallback } from 'react'
import SubIcon from '../assets/SubIcon.json';
import { Select, MenuItem, styled, SelectChangeEvent } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { ArtifactStore, useStore } from '../Data/Store';

const order = ["HP", "ATK", "DEF", "HP %", "ATK %", "DEF %", "Energy Recharge", "Elemental Mastery", "CRIT Rate", "CRIT DMG"];

const StyledSelect = styled(Select)(({ theme }) => ({
  boxShadow: theme.shadows[4],
  background: 'hsl(230, 65%, 7%) linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
}));

const SvgIcon = ({ primary, secondary = undefined, c = "#FFF" }: { primary: string, secondary?: string, c?: string }) => {
  return (
    <svg viewBox="0 0 14 14" width="14px" height="14px" style={{ marginRight: '8px' }}>
      <path d={primary} style={{ color: c }} fill="currentColor" />
      {secondary !== "undefined" && <path d={secondary} style={{ color: c, fillOpacity: 0.5 }} fill="currentColor" />}
    </svg>
  );
}

export default function SubDropdown({ id }: { id: number }) {
  const [substat, setStore] = useStore((store: ArtifactStore) => store.substats[id]);
  const [main] = useStore((store: ArtifactStore) => store.mainstats[1]);

  const selectChange = useCallback((e: SelectChangeEvent<unknown>) => {
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.substats[id] = Number(e.target.value);
      return t;
    });
  }, [setStore]);

  const sublist = useSubList(main, substat, (newValue: number) => {
    setStore((p: ArtifactStore) => {
      var t = { ...p };
      t.substats[id] = newValue;
      return t;
    });
  })

  return (
    <FormControl size="small" sx={{ width: '100%' }}>
      <StyledSelect value={substat} onChange={selectChange}>
        <MenuItem value={-1} sx={{ color: '#FFF' }}> - - - ANY - - - </MenuItem>
        {sublist.map(e => {
          return (
            <MenuItem value={e} key={e} sx={{ color: '#FFF' }}>
              <SvgIcon
                primary={SubIcon[e.toString() as keyof typeof SubIcon].d.primary}
                secondary={(SubIcon[e.toString() as keyof typeof SubIcon].d as { primary: string, secondary?: string }).secondary}
                c={SubIcon[e.toString() as keyof typeof SubIcon].color}
              />
              {order[e]}
            </MenuItem>
          )
        })}
      </StyledSelect>
    </FormControl>
  );
}

const useSubList = (mainstat: number, subval: number, setval: (newValue: number) => void): number[] => {
  var sublist = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  useEffect(() => {
    if (subval === mainstat)
      setval(-1);
    sublist.splice(mainstat, 1);
  }, [mainstat]);
  return sublist;
}