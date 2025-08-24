import React, { useCallback, useMemo } from 'react'
import { Select, MenuItem, InputLabel, FormControl, Box, Typography, styled, SelectChangeEvent } from '@mui/material';
import SubIcon from '../assets/SubIcon.json';
import MainIcon from '../assets/MainIcon.json';
import { ArtifactStore, useStore } from '../Data/Store';

const order = ["HP", "ATK", "DEF", "HP %", "ATK %", "DEF %", "Energy Recharge", "Elemental Mastery", "CRIT Rate", "CRIT DMG", "Healing Bonus", "Elemental DMG Bonus"];

const mainnames = ['Flower', 'Plume', 'Sands', 'Goblet', 'Circlet'];

const StyledSelect = styled(Select)(({ theme }) => ({
  marginBlock: '.5rem',
  boxShadow: theme.shadows[4],
  background: 'hsl(230, 65%, 7%) linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))'
}));

const SvgIcon = ({ primary, secondary = undefined, c = "#FFF" }: { primary: string, secondary?: string, c?: string }) => {
  return <svg viewBox="0 0 14 14" width="14px" height="14px" style={{ marginRight: '8px' }}>
    <path d={primary} style={{ color: c }} fill="currentColor" />
    {secondary !== undefined && <path d={secondary} style={{ color: c, fillOpacity: 0.5 }} fill="currentColor" />}
  </svg>
}

function getMainList(x: number): number[] {
  var mainlist: number[];
  switch (x) {
    case 0: {
      mainlist = [0];
      break;
    }
    case 1: {
      mainlist = [1];
      break;
    }
    case 2: {
      mainlist = [3, 4, 5, 6, 7];
      break;
    }
    case 3: {
      mainlist = [3, 4, 5, 7, 11];
      break;
    }
    case 4: {
      mainlist = [3, 4, 5, 7, 8, 9, 10];
      break;
    }
    default: {
      mainlist = [];
      break;
    }
  };
  return mainlist;
}

export default function ArtifactMainProps() {
  const [maintype, setStore] = useStore((store: ArtifactStore) => store.mainstats[0]);
  const [mainstat] = useStore((store: ArtifactStore) => store.mainstats[1]);
  const mainList = useMemo(() => getMainList(maintype), [maintype]);

  const changeType = useCallback((event: SelectChangeEvent<unknown>) => {
    var temp = 0;
    switch (event.target.value as number) {
      case 0: {
        temp = 0;
        break;
      }
      case 1: {
        temp = 1;
        break;
      }
      case 2: {
        temp = JSON.parse(localStorage.getItem('Artifact.Sands') || "false") || 4;
        break;
      }
      case 3: {
        temp = JSON.parse(localStorage.getItem('Artifact.Goblet') || "false") || 11;
        break;
      }
      case 4: {
        temp = JSON.parse(localStorage.getItem('Artifact.Circlet') || "false") || 8;
        break;
      }
      default: {
        break;
      }
    };
    setStore((prev: ArtifactStore) => {
      var newVal = { ...prev };
      newVal.mainstats[0] = event.target.value as number;
      newVal.mainstats[1] = temp;
      return newVal;
    });
  }, [setStore]);

  const changeMain = useCallback((event: SelectChangeEvent<unknown>) => {
    switch (maintype) {
      case 2: {
        localStorage.setItem('Artifact.Sands', JSON.stringify(event.target.value as number));
        break;
      }
      case 3: {
        localStorage.setItem('Artifact.Goblet', JSON.stringify(event.target.value as number));
        break;
      }
      case 4: {
        localStorage.setItem('Artifact.Circlet', JSON.stringify(event.target.value as number));
        break;
      }
      default: {
        break;
      }
    };
    setStore((prev: ArtifactStore) => {
      var temp = { ...prev };
      temp.mainstats[1] = event.target.value as number;
      return temp;
    });
  }, [maintype, setStore]);

  return (
    <Box sx={{ height: '100%' }}>
      <Typography sx={{ textAlign: 'center' }}> Main affixes </Typography>
      <FormControl size="small" fullWidth>
        <InputLabel id="Type" sx={{ color: "#FFF", my: 1 }}> Type </InputLabel>
        <StyledSelect value={maintype} onChange={changeType} label="Type">
          {mainnames.map((e, i) => {
            return <MenuItem key={i} value={i} sx={{ color: '#FFF', my: 1 }}>
              <SvgIcon primary={MainIcon[i.toString() as keyof typeof MainIcon]} />
              {e}
            </MenuItem>
          })}
        </StyledSelect>
      </FormControl>
      <FormControl size="small" fullWidth>
        <InputLabel id="Main" sx={{ color: "#FFF", my: 1 }}> Main affix </InputLabel>
        <StyledSelect value={mainstat} onChange={changeMain} label="Main affix">
          {mainList.map(e => {
            return (
              <MenuItem value={e} key={e}>
                {
                  e !== 11 && <SvgIcon
                    primary={SubIcon[e.toString() as keyof typeof SubIcon].d.primary}
                    secondary={(SubIcon[e.toString() as keyof typeof SubIcon].d as { primary: string, secondary?: string }).secondary}
                    c={SubIcon[e.toString() as keyof typeof SubIcon].color}
                  /> || e === 11 && <div>
                    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => {
                      return <SvgIcon key={e + i}
                        primary={SubIcon[(e + i).toString() as keyof typeof SubIcon].d.primary}
                        secondary={(SubIcon[(e + i).toString() as keyof typeof SubIcon].d as { primary: string, secondary?: string }).secondary}
                        c={SubIcon[(e + i).toString() as keyof typeof SubIcon].color}
                      />
                    })}
                    <br></br>
                  </div>
                }
                {order[e]}
              </MenuItem>
            )
          })}
        </StyledSelect>
      </FormControl>
    </Box>
  )
}
