import React, { useEffect } from 'react'
import {Select, MenuItem, InputLabel, FormControl, Card, Typography} from '@mui/material';
import SubIcon from '../assets/SubIcon';
import MainIcon from '../assets/MainIcon';

const order = ["HP", "ATK", "DEF", "HP %", "ATK %", "DEF %", "Energy Recharge", "Elemental Mastery", "CRIT Rate", "CRIT DMG", "Healing Bonus", "Elemental DMG Bonus"];

export default function ArtifactMainProps({passMainvals, mainprops}) {
  console.log('mainprops');
  const [type, settype] = React.useState( () => mainprops[0] );
  const [main, setMain] = React.useState( () => mainprops[1] );
  const changeType = event => { settype(event.target.value); };
  const changeMain = event => { setMain(event.target.value); };

  const [mainList, setMainList] = React.useState( () => [0,1,2,3,4,5,6,7,8,9,10,11] );
  useEffect(() => {
    switch(type){
    case 0:
      setMainList([0]);
      setMain(0);
      break;
    case 1:
      setMainList([1]);
      setMain(1);
      break;
    case 2:
      setMainList([3,4,5,6,7]);
      setMain( JSON.parse( localStorage.getItem('storage.sands') ) || 4 );
      break;
    case 3: 
      setMainList([3,4,5,7,11]);
      setMain( JSON.parse( localStorage.getItem('storage.goblet') ) || 11 );
      break;
    case 4: 
      setMainList([3,4,5,7,8,9,10]);
      setMain( JSON.parse( localStorage.getItem('storage.circlet') ) || 8 );
      break;
    default:
      setMainList([0]);
      setMain(0);
      break;
  }}, [type]);

  useEffect( () => { 
    localStorage.removeItem('storage.sands');
    localStorage.removeItem('storage.goblet');
    localStorage.removeItem('storage.circlet');
  }, []);

  useEffect(() => {
    switch(type){
      case 2:
        localStorage.setItem('storage.sands', JSON.stringify( main ));
        break;
      case 3:
        localStorage.setItem('storage.goblet', JSON.stringify( main ));
        break;
      case 4: 
        localStorage.setItem('storage.circlet', JSON.stringify( main ));
        break;
      default:
        break;
    }
    passMainvals([type, main])
  }, [main]);

  return (
    <Card sx={{ bgcolor: 'inherit', boxShadow: 0, borderRadius: 2, height: '100%', backgroundImage: 'none'}}>
      <Typography sx={{textAlign: 'center'}}>Mainstats</Typography>
      <FormControl size="small" sx={{width: '100%'}}>
        <InputLabel id="Type" sx={{color: "#FFF", my: 1}}>Type</InputLabel>
        <Select value={type} onChange={changeType} label="Type" sx={{color: '#FFF', bgcolor: '#242734', my: 1, "& .MuiSvgIcon-root": { color: "#CCC"}}} MenuProps={{ PaperProps: { sx: { backgroundColor: '#242734', backgroundImage: 'none' , "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#343746" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#343746" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#343746" } } } }}>
          <MenuItem value={0} sx={{color: '#FFF', my: 1}}><MainIcon icon={0}/> Flower </MenuItem>
          <MenuItem value={1} sx={{color: '#FFF', my: 1}}><MainIcon icon={1}/> Plume </MenuItem>
          <MenuItem value={2} sx={{color: '#FFF', my: 1}}><MainIcon icon={2}/> Sands </MenuItem>
          <MenuItem value={3} sx={{color: '#FFF', my: 1}}><MainIcon icon={3}/> Goblet </MenuItem>
          <MenuItem value={4} sx={{color: '#FFF', my: 1}}><MainIcon icon={4}/> Circlet </MenuItem>
        </Select>
      </FormControl>
      <FormControl size="small" sx={{width: '100%'}}>
        <InputLabel id="Main" sx={{color: "#FFF", my: 1}}>Mainstat</InputLabel>
        <Select value={main} onChange={changeMain} label="Mainstat" sx={{color: '#FFF', bgcolor: '#242734', my: 1, "& .MuiSvgIcon-root": { color: "#CCC"}}} MenuProps={{ PaperProps: { sx: { backgroundColor: '#242734', backgroundImage: 'none' , "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#343746" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#343746" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#343746" } } } }}>
          {mainList.map( e => { return (
            <MenuItem value={e} key={e}>
              { e!==11 && <SubIcon icon={e} /> || e===11 && <div>
                { [0,1,2,3,4,5,6,7].map( i => { return <SubIcon key={e+i} icon={e+i}/> }) } <br></br> </div> }
              {order[e]}
            </MenuItem>
          )} )}
        </Select>
      </FormControl>
    </Card>
  )
}
