import React, { useState, useCallback } from 'react'
import { Card, CardActionArea, IconButton, Typography, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

export default function Info() {
  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  return (
    <Card sx={{ height: '100%', bgcolor: '#242734', backgroundImage: 'none' }}>
      <CardActionArea onClick={handleOpen} sx={{ height: '100%', p: 2 }}>
        <Typography variant='body1' sx={{ textAlign: 'center' }} >
          Enter the mainstats and substats of the artifact you want to look up. The sliders represent the <strong>acceptable range</strong> of substat upgrade rolls. <br />
          <u>Click for more information.</u>
        </Typography>
      </CardActionArea>
      <Dialog open={open} onClose={handleClose} sx={{ lineHeight: 1.8 }}>
        <DialogTitle sx={{ bgcolor: '#242734', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textDecoration: 'underline', pl: { sm: '4rem' } }}>
          How it works
          <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto' }}>
            <Close />
          </CloseButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: '#242734', px: { sm: '4rem' } }}>
          <ul>
            <li>
              You can specify a certain substat through the dropdown menu. If you don't care which stat it can take on, select "ANY".
              Example:
              <div style={{ paddingLeft: '1rem', color: '#ffffffa5' }}>
                You are searching for a Feather with crit rate and crit damage only, and the rest doesn't matter. Then you'd select 2 of the 4 substats to be "ANY".
              </div>
            </li>
            <li>
              A single substat can receive up to 5 upgrade rolls. To select the number of upgrade rolls, select the range of acceptable upgrade rolls in the slider. Example:
              <div style={{ paddingLeft: '1rem', color: '#ffffffa5' }}>
                You want a Flower with Elemental Mastery (EM). You want at least 1 roll of EM, but no more than 3. Then you'd select the left slider thumb to be 1 and the right to be 3, sice you don't want 0, 4 or 5 upgrade rolls.
              </div>
            </li>
            <li>
              As a result, if you want all upgrade rolls to go into only 2 substats, e.g. crit rate and crit damage, you'd select 0-5 for both substats and 0 for everything else.
            </li>
          </ul>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

