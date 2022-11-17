import React from 'react'
import { Card, Slider, Input, FormGroup } from "@mui/material"

export default function ArtifactUpgradeSlider({startMin, startMax, setMin=0, setMax, passValues, id}) {
  console.log('slider');
  const [lowerValue, setLowerValue] = React.useState(() => startMin);
  const [upperValue, setUpperValue] = React.useState(() => startMax);
  const [sliderVals, setSliderVals] = React.useState(() => [startMin, startMax]);
  function changeMin(event) { setLowerValue( event.target.value === '' ? '' : Number(event.target.value) ); };
  function changeMax(event) { setUpperValue( event.target.value === '' ? '' : Number(event.target.value) ); };
  function handleChange(event, newVal) { setLowerValue(newVal[0]); setUpperValue(newVal[1]); setSliderVals(newVal);}
  function passplusL(e){
    const c = e.target.value === '' ? 0 : ( e.target.value < 0 ? 0 : ( e.target.value > upperValue ? upperValue : Number(e.target.value)));
    setLowerValue( c );
    setSliderVals( [c, upperValue] );
  }
  function passplusU(e){
    const c = e.target.value === '' ? 5 : ( e.target.value > 5 ? 5 : ( e.target.value < lowerValue ? lowerValue : Number(e.target.value)));
    setUpperValue( c );
    setSliderVals( [lowerValue, c] );
  }

  React.useEffect(() => {
    passValues(id, [lowerValue, upperValue]);
  }, [lowerValue, upperValue]);

  React.useEffect(() => {
    if (upperValue > setMax){
      setUpperValue(setMax);
      setSliderVals( [lowerValue, setMax]);
    }
  }, [setMax]);

  return (
    <FormGroup size="small" sx={{width: '100%'}}>
      <Card sx={{display: 'flex', alignItems: 'center', bgcolor: '#242734', boxShadow: 5, height: '40px', borderRadius: '6px', backgroundImage: 'none'}}>
        <Input value={lowerValue} onChange={changeMin} onBlur={passplusL} disableUnderline={true} size="small" inputProps={{ step: 1, min: 0, max: upperValue, type: 'number', style: { textAlign: 'center', width: 25, padding: '3px 0px'} }} sx={{ height: '100%', bgcolor: '#3A77D7', color: '#FFF', borderRadius: '15% 0% 0% 15%', px: '8px'}} />
        <Slider value={sliderVals} onChange={handleChange} min={setMin} max={setMax} step={1} marks sx={{ mx: 2, color: '#3A77D7' }} />
        <Input value={upperValue} onChange={changeMax} onBlur={passplusU} disableUnderline={true} size="small" inputProps={{ step: 1, min: lowerValue, max: 5, type: 'number', style: { textAlign: 'center', width: 25, padding: '3px 0px'} }} sx={{ height: '100%', bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0% 15% 15% 0%', px: '8px'}} />
      </Card>
    </FormGroup>
  )
}
