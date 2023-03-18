import React from 'react'
import { Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material'

export default function Banner() {
  const [type, settype] = React.useState('0');
  const changeType = (event: SelectChangeEvent) => { settype(event.target.value as string); };

  return (
    <FormControl size="small" sx={{ width: '100%' }}>
      <InputLabel id="Banner" sx={{ my: 1 }}>Banner</InputLabel>
      <Select value={type} onChange={changeType} label="Banner" sx={{ color: '#FFF', bgcolor: '#242734', my: 1, "& .MuiSvgIcon-root": { color: "#CCC" } }} MenuProps={{ PaperProps: { sx: { "& .MuiMenuItem-root.Mui-selected": { backgroundColor: "#42464D" }, "& .MuiMenuItem-root:hover": { backgroundColor: "#42464D" }, "& .MuiMenuItem-root.Mui-selected:hover": { backgroundColor: "#42464D" } } } }}>
        <MenuItem value={0}> Character Banner </MenuItem>
        <MenuItem value={1}> Weapon Banner </MenuItem>
        <MenuItem value={2}> Charater + Weapon Banner </MenuItem>
      </Select>
    </FormControl>
  )
}
