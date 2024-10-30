import { useState, useMemo, useCallback } from 'react'
import { Card, Typography, IconButton, CardActions, Modal, TableContainer, Table, TableHead, TableRow, TableCell, Paper, TableBody, Box } from '@mui/material'
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
  inactive?: boolean,
) {
  return { name, data, inactive };
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
  const [starter] = useStore((store: ArtifactStore) => store.starter);

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
      createData('Mainstat configuration', artichance.mains),
      createData('Substat configuration', artichance.permut),
      createData('Upgrade Rolls', artichance.upgrade),
      createData('├─ 4 starting substats', 0.25, starter[1] == 2),
      createData('└─ 3 starting substats', 0.75, starter[1] == 1),
      createData('On/off-set Artifact', artichance.set),
      createData('Double drop rate', resin[0] == 40 ? 0 : 0.07),
      createData('Final Artifact chance', artichance.final)
    ]
  }, [artichance]);

  return (
    <Card elevation={2} sx={{ px: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0px 8px' }}>
        <Typography> Average: {Math.round(((avg) + Number.EPSILON) * 1e2) / 1e2} Days </Typography>
        <CardActions style={{ marginLeft: 'auto' }}>
          <IconButton aria-label="help" onClick={handleOpen} >
            <Help />
          </IconButton>
        </CardActions>
      </div>
      <Modal open={open} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card variant='outlined' sx={{ bgcolor: '#242734', px: 2, py: 3, mx: 2, minWidth: '250px', display: 'flex', gap: 2, overflow: 'overlay' }}>
          <Box sx={{ minWidth: 300 }}>
            <Typography variant='subtitle1' sx={{ p: 1 }}>
              A breakdown of the probability of obtaining the desired artifact per run.
            </Typography>
            <TableContainer sx={{ mt: 2, p: 1 }}>
              <Table size="small" aria-label="data table">
                <TableHead>
                  <TableRow sx={{ borderBottom: '3px solid rgba(81, 81, 81, 1)', backgroundColor: theme => theme.palette.secondary.main }}>
                    <TableCell >Assumption</TableCell>
                    <TableCell align="right">Chance</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row, i) => (
                    <StyledTableRow key={i} className={row.inactive ? 'inactive-row' : ''}>
                      <TableCell component="th" scope="row">{row.name}</TableCell>
                      <TableCell align="right">{roundSigfig(row.data * 100)} %</TableCell>
                    </StyledTableRow>
                  ))
                  }
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <CloseButton onClick={handleClose} sx={{ width: '30px', height: '30px', borderRadius: 1, ml: 'auto' }}>
            <Close />
          </CloseButton>
        </Card>
      </Modal>
    </Card>
  )
}