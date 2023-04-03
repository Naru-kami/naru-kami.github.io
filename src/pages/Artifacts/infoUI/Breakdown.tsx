import React, { useState, useMemo, useCallback } from 'react'
import { Card, Typography, IconButton, CardActions, Modal, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody } from '@mui/material'
import { Help, Close } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
import { useStore, ArtifactStore } from '../Data/Store';
import { roundSigfig } from '../../Wishing/utils';

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  '&:hover': {
    backgroundColor: red[900],
  },
}));

function createData(
  name: string,
  data: number,
) {
  return { name, data };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  '&:last-child td, &:last-child th': {
    border: 0,
    borderTop: '3px solid rgba(81, 81, 81, 1)'
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

  const data = useMemo(() => {
    return [
      createData('Substat configuration', artichance.permut),
      createData('Mainstat configuration', artichance.mains),
      createData('Upgrade Rolls', artichance.upgrade),
      createData('On/off-set Artifact', artichance.set),
      createData('Double drop rate', resin[0] == 40 ? 0 : 0.07),
      createData('4 starting substats', 0.25),
      createData('3 starting substats', 0.75),
      createData('Final Artifact chance', artichance.final)
    ]
  }, [artichance]);

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
        <Card variant='outlined' sx={{ bgcolor: '#242734', px: 2, py: 3, mx: 2, minWidth: '250px', display: 'flex', gap: 2, overflow: 'overlay' }}>
          <div style={{ minWidth: 300 }}>
            <Typography variant='subtitle1' sx={{ p: 1 }}>
              A breakdown of the probability of obtaining the desired artifact per run.
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
              <Table size="small" aria-label="data table">
                <TableHead>
                  <TableRow sx={{ borderBottom: '3px solid rgba(81, 81, 81, 1)' }}>
                    <TableCell >Assumption</TableCell>
                    <TableCell align="right">Chance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <StyledTableRow key={i} >
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{roundSigfig(row.data * 100)} %</TableCell>
                    </StyledTableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, marginLeft: 'auto', bgcolor: 'A00' }}>
            <Close />
          </CloseButton>
        </Card>
      </Modal>
    </Card>
  )
}