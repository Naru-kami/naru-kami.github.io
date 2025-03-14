import { useCallback } from 'react';
import { Grid, Card, Typography, styled, ListItemButton, Switch, SelectChangeEvent, FormControl, Select, MenuItem, Slider, Tooltip, Link, Divider } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors'
import Goal from './Goal';
import Guarantee from './Guarantee';
import Pity from './Pity';
import character from '../assets/character.png';
import { useStore, WishingStore } from '../Store';
import NumberInput from '../../../components/NumberInput';
import { clamp } from '../utils';
import { userPrimogemSwitcher } from './CurrencySwitcher';

const StyledListItemButton = styled(ListItemButton)(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  backgroundColor: "hsl(230, 65%, 7%)",
  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.108), rgba(255, 255, 255, 0.108))',
  boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)",
  padding: 0,
  borderBottom: '1px solid #FFFFFF33',
  borderRadius: '6px 6px 0 0'
}));

const Image = styled('img')(() => ({
  margin: '0 8px 4px 0',
  verticalAlign: 'middle',
  height: 22
}))

export default function Input() {
  const [enabled, setStore] = useStore(store => store.char.enabled);
  return (
    <Card elevation={2} sx={{ p: 2, mx: 'auto', position: 'relative' }}>
      <Enabler enabled={enabled} setStore={setStore} />
      <Grid ref={node => !enabled ? node?.setAttribute('inert', '') : node?.removeAttribute('inert')} container spacing={2}>
        <Grid item xs={12} textAlign='center'>
          <Typography variant="h6" component="h3" style={{ textDecoration: 'underline' }} >
            <Image src={character} alt='character banner' />Character Banner
          </Typography>
        </Grid>
        <Grid item xs={5} sm={4} display='flex' alignItems='flex-end'>
          <ModeSwitcher />
        </Grid>
        <Grid item xs={7} sm={8}>
          <Goal adornment={"C"} max={6} ns='char' />
        </Grid>
        <Grid item xs={5} sm={4}>
          <label htmlFor="charPity" style={{ width: '100%', height: '100%', borderBottom: '1px solid #FFFFFF33', display: 'flex', alignItems: 'center', paddingInline: '0.5rem' }}>
            <Typography variant='body1' component="span" style={{ display: 'flex', alignItems: 'center' }} >
              5 <StarIcon sx={{ color: yellow[700], fontSize: 22, px: '2px', height: 'auto' }} /> Pity
            </Typography>
          </label>
        </Grid>
        <Grid item xs={7} sm={8}>
          <Pity max={89} ns='char' />
        </Grid>
        <Grid item xs={5} sm={4}>
          <StyledListItemButton>
            <label htmlFor='charGuaranteed' style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingInline: '0.5rem' }}>
              <Typography variant='body1' component="span" style={{ display: 'flex', alignItems: 'center' }} >
                Guarantee
              </Typography>
              <Guarantee id={"charGuaranteed"} ns='char' />
            </label>
          </StyledListItemButton>
        </Grid>
        <Grid item xs={7} sm={8}>
          <CapturingRadiance />
        </Grid>
      </Grid >
    </Card >
  )
}

function Enabler({ enabled, setStore }: { enabled: boolean, setStore: (value: Partial<WishingStore> | ((prev: WishingStore) => WishingStore)) => void }) {
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
      {!enabled && <Card elevation={2} sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.7,
        zIndex: 100,
        cursor: "not-allowed"
      }}>
      </Card>}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, padding: 5,
        zIndex: 101
      }}>
        <Switch checked={enabled} onChange={handleChange} color="primary" inputProps={{ "aria-label": 'enable character banner' }} />
      </div>
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
      <Select value={mode} onChange={handleMode} variant="standard" sx={{ pl: 1 }} >
        <MenuItem value={'distribution'}>
          <Typography variant='body1' sx={{ overflow: 'clip', textOverflow: 'ellipsis' }} >
            Constellation
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

const StyledCard = styled(Card)(() => ({
  display: "flex",
  alignItems: "center",
  height: "40px",
  width: '100%',
  borderRadius: "6px",
}));

function CapturingRadiance() {
  const [radiance, setStore] = useStore(store => store.char.radiance);

  const handleNumber = useCallback((e: number) => {
    const c = clamp(0, e, 3);
    setStore(prev => {
      prev.char.radiance = c;
      prev.plotdataSim.changed = true;
      return { ...prev }
    });
    return c;
  }, [setStore]);

  const handleSlider = useCallback((event: Event, value: number | number[]) => {
    setStore(prev => {
      prev.char.radiance = value as number;
      prev.plotdataSim.changed = true;
      return { ...prev };
    })
  }, [setStore]);

  return (
    <StyledCard elevation={4}>
      <NumberInput
        id='Radiance'
        value={radiance}
        onChange={handleNumber}
        inputProps={{
          step: 1, min: 0, max: 3,
          type: 'number',
          style: { padding: '3px', width: '2rem' }
        }}
        sx={{ height: '100%', p: '0 0 0 0.5rem' }}
        startAdornment={<>
          <Tooltip title={
            <Typography>
              <Link href="https://www.reddit.com/r/Genshin_Impact/comments/1hd1sqa/understanding_genshin_impacts_capturing_radiance/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1" target="_blank">Capturing Radiance</Link>:<br />Enter the counter for 50:50 losses. See reference for more info.
            </Typography>} arrow placement='top'
          >
            <label htmlFor='Radiance'>
              <Typography variant='body1' sx={{ whiteSpace: 'nowrap', pr: 1, textDecoration: 'underline', textDecorationStyle: 'dotted', textUnderlineOffset: '2px', textDecorationThickness: '1px' }}>
                C.R.:
              </Typography>
            </label>
          </Tooltip>
          <Divider orientation="vertical" flexItem />
        </>}
      />
      <Slider
        max={3} marks
        value={radiance}
        onChange={handleSlider}
        sx={{ mx: 2 }}
      />
    </StyledCard>
  )
}
