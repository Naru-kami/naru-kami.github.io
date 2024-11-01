import { Grid, Card, Typography, styled, ListItemButton, Switch, FormControl, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors'
import Goal from './Goal';
import Pity from './Pity';
import Guarantee from './Guarantee';
import { useStore, WishingStore } from '../Store';
import { useCallback } from 'react';
import weapon from '../assets/weapon.png';
import { userPrimogemSwitcher } from './CurrencySwitcher';

const StyledListItemButton = styled(ListItemButton)(() => ({
  height: "40px",
  backgroundColor: "hsl(230, 65%, 7%)",
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.108), rgba(255, 255, 255, 0.108))',
  boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  padding: 0,
  borderBottom: '1px solid #FFFFFF33',
  borderRadius: '6px 6px 0 0'
}));

export default function WeaponInput() {
  const [enabled, setStore] = useStore(store => store.weap.enabled);
  return (
    <Card elevation={2} sx={{ p: 2, mx: 'auto', position: 'relative' }}>
      <Enabler enabled={enabled} setStore={setStore} />
      <Grid ref={node => !enabled ? node?.setAttribute('inert', '') : node?.removeAttribute('inert')} container spacing={2}>
        <Grid item xs={12} textAlign='center'>
          <Typography variant="h6" style={{ textDecoration: 'underline' }} >
            {<img src={weapon} width='20px' height='20px' />} Weapon Banner
          </Typography>
        </Grid>
        <Grid item xs={5} sm={4} display='flex' alignItems='flex-end'>
          <ModeSwitcher />
        </Grid>
        <Grid item xs={7} sm={8}>
          <Goal adornment={"R"} max={5} ns='weap' />
        </Grid>
        <Grid item xs={5} sm={4}>
          <label htmlFor="weapPity" style={{ width: '100%', height: '100%', borderBottom: '1px solid #FFFFFF33', display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
            <Typography variant='subtitle1' style={{ display: 'flex', alignItems: 'center' }}>
              5 <StarIcon sx={{ color: yellow[700], fontSize: 22, px: '2px', height: 'auto' }} /> Pity
            </Typography>
          </label>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Pity max={76} ns='weap' />
        </Grid>
        <Grid item xs={5} sm={4}>
          <StyledListItemButton>
            <label htmlFor='weapGuaranteed' style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: '0.5rem' }}>
              <Typography variant='subtitle1' style={{ display: 'flex', alignItems: 'center' }}>
                Guarantee
              </Typography>
              <Guarantee id={"weapGuaranteed"} ns='weap' />
            </label>
          </StyledListItemButton>
        </Grid>
        <Grid item xs={7} sm={8}>
        </Grid>
      </Grid >
    </Card>
  );
}

function Enabler({ enabled, setStore }: { enabled: boolean, setStore: (value: Partial<WishingStore> | ((prev: WishingStore) => WishingStore)) => void }) {
  const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    setStore(prev => {
      var t = { ...prev };
      t.weap.enabled = checked;
      t.plotdataSim.changed = true;
      if (t.mode == 'fixed') {
        t.char.enabled = false;
      }
      return t;
    })
  }, [setStore]);

  return (
    <>
      {!enabled && <Card elevation={2} sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.7,
        zIndex: 100,
        cursor: "not-allowed"
      }}>
      </Card>}
      <label style={{
        position: 'absolute',
        top: 0, left: 0, padding: 5,
        zIndex: 101
      }}>
        <Switch checked={enabled} onChange={handleChange} color="primary" />
      </label>
    </>
  );
}

function ModeSwitcher() {
  const [mode, setStore] = useStore(store => store.mode);
  const [usePrimogems] = userPrimogemSwitcher();

  const handleMode = useCallback((event: SelectChangeEvent<"distribution" | "fixed">) => {
    setStore(prev => {
      var t = { ...prev };
      t.mode = event.target.value as ("distribution" | "fixed");
      t.char.enabled = false;
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
      <Select value={mode} onChange={handleMode} variant="standard" sx={{ pl: 1 }} >
        <MenuItem value={'distribution'}>
          <Typography variant='body1' sx={{ overflow: 'clip', textOverflow: 'ellipsis' }}>
            Refinement
          </Typography>
        </MenuItem>
        <MenuItem value={'fixed'}>
          <Typography variant='body1' >
            {usePrimogems ? "Primogems" : "Wishes"}
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  )

}
