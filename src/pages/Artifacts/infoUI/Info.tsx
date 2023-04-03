import React, { useState, useCallback } from 'react'
import { Card, CardActionArea, Modal, IconButton, Typography } from '@mui/material'
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
      <Modal open={false} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card variant='outlined' sx={{ backgroundImage: 'none', bgcolor: '#242734', p: 2, width: '75%', minWidth: '250px', display: 'flex' }}>
          <Typography>
            TEST TEXT
          </Typography>
          <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto', bgcolor: 'A00' }}>
            <Close />
          </CloseButton>
        </Card>
      </Modal>
    </Card>
  )
}
