import React from 'react'
import { Card, Typography, IconButton, CardActions, Modal } from '@mui/material'
import { Help, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

export default function Breakdown({artichance, trials}) {
  const [artidistr, setartidistr] = React.useState( () => artichance );
  React.useEffect(()=> {
    setartidistr( p => ({...p, ...artichance}));
  }, [artichance.final]);
  const avg = isNaN(artichance.final) ? 0 : 1/artichance.final/trials;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Card variant='outlined' sx={{backgroundImage: 'none', bgcolor: 'inherit', p: 1}}>
      <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 8px 0px 8px'}}>
        <Typography> Average: {Math.round(((avg) + Number.EPSILON) * 1e2) / 1e2} Days </Typography>
        <CardActions style={{marginLeft: 'auto'}}>
          <IconButton aria-label="help" onClick={handleOpen} >
            <Help />
          </IconButton>
        </CardActions>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Card variant='outlined' sx={{backgroundImage: 'none', bgcolor: '#242734', p: 2, width: '75%', minWidth: '250px', display: 'flex'}}>
          <div>
            {Object.keys(artidistr).map( (e, i) => {return <Typography key={i}>{e}: {Math.round(((artichance[e]*100) + Number.EPSILON) * 1e6) / 1e6}%</Typography>})}
          </div>
          <CloseButton onClick={handleClose} sx={{width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto', boxShadow: 3, bgcolor: 'A00'}}>
            <Close />
          </CloseButton>
        </Card>
      </Modal>
    </Card>
  )
}