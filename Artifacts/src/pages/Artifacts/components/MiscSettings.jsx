import React from 'react'
import {Select, MenuItem, InputLabel, FormControl} from '@mui/material';

export default function MiscSettings({passMisc, misc}) {
  const [set, setSet] = React.useState(() => misc[0]);
  const [starting, setStarting] = React.useState(() => misc[1]);
  const changeSet = event => setSet(event.target.value);
  const changeStarting = event => setStarting(event.target.value);

  React.useEffect( () => {
    passMisc([set, starting]);
  }, [set, starting]);

  return (
    <div style={{display: 'block', width: '100%'}}>
      <FormControl sx={{ width: '100%'}} size="small">
        <InputLabel id="set" sx={{color: "#FFF", m: 1}}>Artifact set option</InputLabel>
        <Select value={set} onChange={changeSet} label="Artifact set option" sx={{color: '#FFF', bgcolor: '#242734', m: 1, "& .MuiSvgIcon-root": { color: "#CCC"}}} MenuProps={{ PaperProps: { sx: { backgroundColor: '#242734', backgroundImage: 'none' , "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#343746" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#343746" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#343746" } } } }}>
          <MenuItem value={2} sx={{color: '#FFF', my: 1}}> Use On-Set Artifact </MenuItem>
          <MenuItem value={1} sx={{color: '#FFF', my: 1}}> Use Off-Set Artifact </MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ width: '100%', mt: 1 }} size="small">
        <InputLabel id="starting" sx={{color: "#FFF", m: 1}}>Starting Substats</InputLabel>
        <Select value={starting} onChange={changeStarting} label="Starting Substats" sx={{color: '#FFF', bgcolor: '#242734', m: 1, "& .MuiSvgIcon-root": { color: "#CCC"}}} MenuProps={{ PaperProps: { sx: { backgroundColor: '#242734', backgroundImage: 'none' , "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#343746" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#343746" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#343746" } } } }}>
          <MenuItem value={0} sx={{color: '#FFF', my: 1}}> Any </MenuItem>
          <MenuItem value={1} sx={{color: '#FFF', my: 1}}> 4 </MenuItem>
          <MenuItem value={2} sx={{color: '#FFF', my: 1}}> 3 </MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
