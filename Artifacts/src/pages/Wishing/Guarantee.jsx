import React from 'react'
import { Typography, Card } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Guarantee() {
    const [check, setcheck] = React.useState( () => false);
    const updatecheck = () => setcheck(!check);

    return (
    <Card variant='outlined' sx={{bgcolor: 'inherit'}}>
      <FormGroup>
      <FormControlLabel sx={{mr: 'auto'}} label={<Typography variant="h7" style={{ color: '#fff' }} >Guaranteed pity? </Typography>} control={<Checkbox value={check} onChange={updatecheck}/>} labelPlacement="start"/>
      </FormGroup>
    </Card>
  )
}
