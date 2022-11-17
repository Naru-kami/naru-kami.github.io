import React from 'react'
import SubIcon from '../assets/SubIcon';
import {Select, MenuItem} from '@mui/material';
import FormControl from '@mui/material/FormControl';

const order = ["HP", "ATK", "DEF", "HP %", "ATK %", "DEF %", "Energy Recharge", "Elemental Mastery", "CRIT Rate", "CRIT DMG"];

export default function SubDropdown({mainval, startval, passSubvals, id}) {
  console.log('subdropdown');

  const [sublist, setSublist] = React.useState(() => [0,1,2,3,4,5,6,7,8,9]);
  const [val, setval] = React.useState(startval);
  const selectChange = (event) => { setval(event.target.value); };
  
  React.useEffect( () => {
    if( val === mainval[1] ) setval(-1);
    let c = [0,1,2,3,4,5,6,7,8,9];
    c.splice( mainval[1], 1);
    setSublist(c);
  }, [mainval[1]]);

  React.useEffect( () => {
    passSubvals(id, val);
  }, [val]);

  return (
    <FormControl size="small" sx={{width: '100%'}}>
      <Select value={val} onChange={selectChange} inputProps={{ 'aria-label': 'Without label' }} sx={{color: '#FFF', bgcolor: '#242734', "& .MuiSvgIcon-root": { color: "#CCC"}}} MenuProps={{ PaperProps: { sx: { backgroundColor: '#242734', backgroundImage: 'none' , "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#343746" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#343746" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#343746" } } } }}>
        <MenuItem value={-1} sx={{color: '#FFF'}}> - - - ANY - - - </MenuItem>
        {sublist.map( e => {return <MenuItem value={e} key={e} sx={{color: '#FFF'}}> <SubIcon icon={e}/> {order[e]} </MenuItem> } )}
      </Select>
    </FormControl>
  )
}
