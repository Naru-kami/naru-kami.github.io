import React from 'react'
import { Input, Card, Slider } from '@mui/material';

export default function Resin({passResin, resins}) {
  const [RpA, setRpA] = React.useState(() => resins[0]);
  const [RpD, setRpD] = React.useState(() => resins[1]);
  const [RpASlider, setRpASlider] = React.useState(() => resins[0]);
  const [RpDSlider, setRpDSlider] = React.useState(() => resins[1]);
  const changeRpA = event => {setRpA( event.target.value === '' ? '' : Number(event.target.value) );};
  const changeRpD = event => {setRpD( event.target.value === '' ? '' : Number(event.target.value) );};
  function changeRpAHandle(event, newVal) { setRpASlider(Number(newVal)); setRpA(Number(newVal));}
  function changeRpDHandle(event, newVal) { setRpDSlider(Number(newVal)); setRpD(Number(newVal));}

  function correctRpA(e){
    const c = e.target.value === '' ? 20 : ( e.target.value <= 29 ? 20 : ( e.target.value >= 30 ? 40 : Number(e.target.value)));
    setRpA(Number(c));
    setRpASlider(Number(c));
  }
  function correctRpD(e){
    const d = e.target.value === '' ? 180 : ( e.target.value <= 180 ? 180 : ( e.target.value >= 540 ? 540 : Number(e.target.value)));
    const target = [180,240,300,360,420,480,540].reduce( (p, c) => Math.abs(c-d) <= Math.abs(p-d) ? c : p, 180);
    setRpD(Number(target));
    setRpDSlider(Number(target));
  }
  
  React.useEffect(() => {
    passResin([RpA, RpD]);
  }, [RpA, RpD]);

  return (
    <Card variant='outlined' sx={{display: 'block', width: '100%', alignItems: 'center', bgcolor: 'inherit', boxShadow: 0, my: "5px", borderRadius: "6px", py: 1}}>
      <div style={{display: 'flex', height: '46px'}}>
        <label style={{display: 'flex'}}>
          <Card sx={{width: '125px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none'}}>
          Resin per Artifact:
          </Card>
          <Input disableUnderline={true} value={RpA} onChange={changeRpA} onBlur={correctRpA} inputProps={{ step: 20, min: 20, max: 40, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px'} }} sx={{ height: 30, width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px'}} />
        </label>
        <Slider value={RpASlider} onChange={changeRpAHandle} step={20} min={20} max={40} marks sx={{ mx: 2, my: 'auto', color: '#3A77D7' }} />
      </div>
      <div style={{display: 'flex',  height: '46px'}}>
        <label style={{display: 'flex'}}>
          <Card sx={{width: '125px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none'}}>
          Resin per day:
          </Card>
          <Input disableUnderline={true} value={RpD} onChange={changeRpD} onBlur={correctRpD} inputProps={{ step: 60, min: 180, max: 540, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px'} }} sx={{ height: 30, width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px'}}  />
        </label>
        <Slider value={RpDSlider} onChange={changeRpDHandle} step={60} min={180} max={540} marks sx={{ mx: 2, my: 'auto', color: '#3A77D7' }} />
      </div>
    </Card>
  )
}
