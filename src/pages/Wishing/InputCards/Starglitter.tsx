import React, { useCallback } from 'react'
import { Card, Grid, styled, ListItemButton, Typography, Box, InputAdornment, FormControl, Select, SelectChangeEvent, MenuItem } from '@mui/material'
import Checkbox from '@mui/material/Checkbox';
import starglitter from '../assets/starglitter.png'
import { useStore } from '../Store';
import NumberInput from '../../../components/NumberInput';
import fiveStarCons from '../assets/fiveStarCons.webp';
import fourStarCons from '../assets/fourStarCons.png';

const StyledListItemButton = styled(ListItemButton)(() => ({
  backgroundColor: "#1B1D2A",
  height: "40px",
  backgroundImage: "none",
  padding: 0,
}));

const StyledSelect = styled(Select)(() => ({
  color: '#FFF',
  backgroundColor: '#242734',
  "& .MuiSvgIcon-root": {
    color: "#CCC"
  }
}));

const menuprops = {
  PaperProps: {
    sx: {
      backgroundColor: '#242734',
      backgroundImage: 'none',
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "#343746"
      },
      "& .MuiMenuItem-root:hover": {
        backgroundColor: "#343746"
      },
      "& .MuiMenuItem-root.Mui-selected:hover": {
        backgroundColor: "#343746"
      }
    }
  }
}

export default function Starglitter() {
  const [check, setStore] = useStore(store => store.starglitter.enabled);
  const updatecheck = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => {
      var t = { ...prev };
      t.starglitter.enabled = checked;
      t.plotdataSim.changed = true;
      return t;
    })
  }, [setStore]);

  const [count] = useStore(store => store.starglitter.count);
  const updatecount = useCallback((newValue: number) => {
    setStore(prev => {
      var t = { ...prev };
      t.starglitter.count = newValue;
      t.plotdataSim.changed = true;
      return t;
    })
  }, []);

  return (
    <Card sx={{ bgcolor: '#1B1D2A', backgroundImage: 'none', width: '100%' }}>
      <StyledListItemButton>
        <label style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', paddingInline: '8px' }}>
          <Typography sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {<img src={starglitter} width='24px' height='24px' />} Use Starglitter?
          </Typography>
          <Checkbox checked={check} onChange={updatecheck} />
        </label>
      </StyledListItemButton>

      <Box sx={{ display: check ? 'block' : 'none', position: 'relative', p: 1 }}>
        <Typography variant='subtitle1'>
          Enter Starglitter and Constellations:
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <NumberInput value={count} onChange={updatecount} id={'starglitterCount'}
              startAdornment={
                <InputAdornment position="start" sx={{ mr: '-0.125rem', ml: '.125rem' }}>
                  <label htmlFor={'starglitterCount'}>
                    <Typography variant='body2' sx={{ display: 'flex', alignItems: 'center' }}>
                      {<img src={starglitter} width={29} height={29} />}
                    </Typography>
                  </label>
                </InputAdornment>
              }
              inputProps={{ step: 1, min: 0, type: 'number', style: { padding: '3px 0px' } }}
              sx={{ borderRadius: '6px', width: '100%', height: "100%", m: 0, px: 0.5 }}
            />
          </Grid>
          <Grid item xs={6}>
            <ConstCount ns='fiveStar' id={0} adornment={
              <img src={fiveStarCons} width={24} height={24} />
            } />
          </Grid>
          {[1, 2, 3].map(e => {
            return (
              <Grid item xs={4} key={e}>
                <ConstCount ns='first' id={e} adornment={
                  <img src={fourStarCons} width={24} height={24} />
                } />
              </Grid>
            )
          })}
        </Grid>
        {!check && <div style={{
          position: 'absolute',
          top: 8, bottom: 0, left: 0, right: 0,
          opacity: 0.7,
          backgroundColor: '#1B1D2A',
          zIndex: 100
        }}> </div>}
      </Box>
    </Card>
  )
}

function ConstCount({ adornment, id }: { adornment: string | JSX.Element, ns: string, id: number }) {
  const [cons, setStore] = useStore(store => store.starglitter.cons[id]);
  const handleCons = useCallback((event: SelectChangeEvent<unknown>) => {
    setStore(prev => {
      var t = { ...prev };
      t.starglitter.cons[id] = event.target.value as number;
      t.plotdataSim.changed = true;
      return t;
    })
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <FormControl size="small" sx={{ width: '100%' }}>
        <StyledSelect value={cons} onChange={handleCons} MenuProps={menuprops}>
          <MenuItem value={-1}>
            <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }} >
              {adornment}
              None
            </Typography>
          </MenuItem>
          {[0, 1, 2, 3, 4, 5, 6].map(e => {
            return (
              <MenuItem value={e} key={e}>
                <Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }}>
                  {adornment}
                  C{e}
                </Typography>
              </MenuItem>
            )
          })}
        </StyledSelect>
      </FormControl>
    </div>
  );
}