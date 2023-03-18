import React, { useState } from 'react'
import { Typography, Card, Input, Grid } from '@mui/material'
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function Starglitter() {
  const [check, setcheck] = useState(() => false);
  const updatecheck = () => setcheck(!check);

  const [count, setcount] = useState("0");
  const updatecount = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setcount(e.target.value);

  return (
    <>
      <Card variant='outlined' sx={{ bgcolor: 'inherit' }}>
        <FormGroup>
          <FormControlLabel sx={{ mr: 'auto' }} label={<Typography variant="h6" style={{ color: '#fff' }} >Use Starglitter? </Typography>} control={<Checkbox value={check} onChange={updatecheck} />} labelPlacement="start" />
        </FormGroup>
      </Card>
      {check &&
        <Card variant='outlined' sx={{ bgcolor: 'inherit' }}>
          <label style={{ display: 'flex' }}>
            <Card sx={{ width: '190px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              Current Starglitter count:
            </Card>
            <Input disableUnderline={true} value={count} onChange={updatecount} inputProps={{ step: 1, min: 0, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px' } }} sx={{ width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px' }} />
          </label>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <label style={{ display: 'flex' }}>
                <Card sx={{ width: '190px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  first 4 star:
                </Card>
                <Input disableUnderline={true} value={count} onChange={updatecount} inputProps={{ step: 1, min: 0, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px' } }} sx={{ width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px' }} />
              </label>
            </Grid>
            <Grid item xs={4}>
              <label style={{ display: 'flex' }}>
                <Card sx={{ width: '190px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  second 4 star:
                </Card>
                <Input disableUnderline={true} value={count} onChange={updatecount} inputProps={{ step: 1, min: 0, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px' } }} sx={{ width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px' }} />
              </label>
            </Grid>
            <Grid item xs={4}>
              <label style={{ display: 'flex' }}>
                <Card sx={{ width: '190px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  third 4 star:
                </Card>
                <Input disableUnderline={true} value={count} onChange={updatecount} inputProps={{ step: 1, min: 0, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px' } }} sx={{ width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px' }} />
              </label>
            </Grid>
          </Grid>
        </Card>}
    </>
  )
}