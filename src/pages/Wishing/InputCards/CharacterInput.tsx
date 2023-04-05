import { useCallback } from 'react';
import { Grid, Card, Typography, styled, ListItemButton, Switch, SelectChangeEvent, FormControl, Select, MenuItem } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors'
import Goal from './Goal';
import Guarantee from './Guarantee';
import Pity from './Pity';
import character from '../assets/character.png';
import { useStore } from '../Store';

const StyledListItemButton = styled(ListItemButton)(() => ({
  display: "flex",
  alignItems: "center",
  backgroundColor: "#242734",
  height: "40px",
  boxShadow: "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%);",
  borderRadius: "6px",
  backgroundImage: "none",
  padding: 0,
}));

export default function Input() {
  return (
    <Card sx={{ p: 2, bgcolor: '#1B1D2A', backgroundImage: 'none', mx: 'auto', position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign='center'>
          <Typography variant="h6" style={{ textDecoration: 'underline' }} >
            <img src={character} width='20px' height='20px' /> Character Banner
          </Typography>
        </Grid>
        <Grid item xs={5} display='flex' alignItems='flex-end'>
          <ModeSwitcher />
        </Grid>
        <Grid item xs={7}>
          <Goal adornment={"C"} max={6} ns='char' />
        </Grid>
        <Grid item xs={5}>
          <label htmlFor="charPity" style={{ width: '100%', height: '100%', borderBottom: '1px solid #FFFFFF33', display: 'flex', alignItems: 'center' }}>
            <Typography variant='body1' style={{ display: 'flex', alignItems: 'center' }} >
              5 <StarIcon sx={{ color: yellow[700], fontSize: 22, px: '2px', height: 'auto' }} /> Pity
            </Typography>
          </label>
        </Grid>
        <Grid item xs={7}>
          <Pity max={89} ns='char' />
        </Grid>
        <Grid item xs={5}>
          <label htmlFor='charGuaranteed' style={{ width: '100%', height: '100%', borderBottom: '1px solid #FFFFFF33', display: 'flex', alignItems: 'center' }}>
            <Typography variant='body1' style={{ display: 'flex', alignItems: 'center' }} >
              Guarantee
            </Typography>
          </label>
        </Grid>
        <Grid item xs={7}>
          <StyledListItemButton>
            <label style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Guarantee id={"charGuaranteed"} ns='char' />
            </label>
          </StyledListItemButton>
        </Grid>
      </Grid >
      <Enabler />
    </Card >
  )
}

function Enabler() {
  const [enable, setStore] = useStore(store => store.char.enabled);
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => {
      var t = { ...prev };
      t.char.enabled = checked;
      t.plotdataSim.changed = true;
      if (t.mode == 'fixed') {
        t.weap.enabled = false;
      }
      return t;
    })
  }, [setStore]);

  return (
    <>
      {!enable && <div style={{
        position: 'absolute',
        top: 0, bottom: 0, left: 0, right: 0,
        opacity: 0.7,
        backgroundColor: '#1B1D2A',
        zIndex: 100
      }}>
      </div>}
      <label style={{
        position: 'absolute',
        top: 0, left: 0, padding: 5,
        zIndex: 101
      }}>
        <Switch checked={enable} onChange={handleChange} color="primary" />
      </label>
    </>
  );
}

function ModeSwitcher() {
  const [mode, setStore] = useStore(store => store.mode);

  const handleMode = useCallback((event: SelectChangeEvent<"distribution" | "fixed">) => {
    setStore(prev => {
      var t = { ...prev };
      t.mode = event.target.value as ("distribution" | "fixed");
      t.weap.enabled = false;
      t.plotdataSim.changed = true;
      t.plotdataSim.x = [];
      t.plotdataSim.y = [];
      t.plotdataCalc.x = [];
      t.plotdataCalc.y = [];
      return t;
    })
  }, [setStore]);

  return (
    <FormControl size="small" sx={{ width: '100%' }}>
      <Select value={mode} onChange={handleMode} variant="standard" >
        <MenuItem value={'distribution'}>
          <Typography variant='body1' >
            Constellation
          </Typography>
        </MenuItem>
        <MenuItem value={'fixed'}>
          <Typography variant='body1' >
            Wishes
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  )

}
