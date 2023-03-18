import React, { useState, useMemo, useCallback } from 'react'
import { Card, Typography, IconButton, CardActions, Modal } from '@mui/material'
import { Help, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useStore, ArtifactStore } from '../Data/Store';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

export default function Breakdown() {
  const [artichance] = useStore((store: ArtifactStore) => store.artichance);
  const [final] = useStore((store: ArtifactStore) => store.artichance.final);
  const [resin] = useStore((store: ArtifactStore) => store.resin);

  const trials = resin[1] / resin[0];
  const avg = final ? 1 / final / trials : 0;

  const [open, setOpen] = useState(false);
  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [setOpen]);
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [setOpen]);

  return (
    <Card variant='outlined' sx={{ bgcolor: 'inherit', p: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 8px 0px 8px' }}>
        <Typography> Average: {Math.round(((avg) + Number.EPSILON) * 1e2) / 1e2} Days </Typography>
        <CardActions style={{ marginLeft: 'auto' }}>
          <IconButton aria-label="help" onClick={handleOpen} >
            <Help />
          </IconButton>
        </CardActions>
      </div>
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card variant='outlined' sx={{ bgcolor: '#242734', p: 2, width: '75%', minWidth: '250px', display: 'flex' }}>
          <div>
            {Object.keys(artichance).map((e, i) => { return <Typography key={i}>{e}: {Math.round(((artichance[e as keyof typeof artichance] * 100) + Number.EPSILON) * 1e6) / 1e6}%</Typography> })}
          </div>
          <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto', boxShadow: 3, bgcolor: 'A00' }}>
            <Close />
          </CloseButton>
        </Card>
      </Modal>
    </Card>
  )
}