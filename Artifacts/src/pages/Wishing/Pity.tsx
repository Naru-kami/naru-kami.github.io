import React, { useState } from 'react'
import { Card } from '@mui/material'
import StarIcon from '@mui/icons-material/Star';
import { yellow } from '@mui/material/colors'
import NumberInput from '../../components/NumberInput';

export default function Pity() {
  const [count, setcount] = useState(0);
  const updatecount = (e: number) => setcount(e);
  return (
    <div style={{ display: 'flex', height: '52px' }}>
      <label style={{ display: 'flex' }}>
        <Card sx={{ width: '170px', bgcolor: '#3A77D7', boxShadow: 0, margin: "8px 0px 8px 8px", borderRadius: "2px 0px 0px 2px", pl: 1, py: "4.5px", backgroundImage: 'none', display: 'flex', alignItems: 'center' }}>
          Current 5 <StarIcon sx={{ color: yellow[700], fontSize: 18, px: '2px', pt: '2px' }} /> pity:
        </Card>
        <NumberInput value={count} onChange={updatecount} inputProps={{ step: 1, min: 0, max: 89, type: 'number', style: { textAlign: 'center', width: 40, padding: '3px 0px' } }} sx={{ width: "60px", bgcolor: '#3A77D7', color: '#FFF', borderRadius: '0px 6px 6px 0px', margin: "8px 8px 8px 0px", px: '8px' }} />
      </label>
    </div>
  )
}
