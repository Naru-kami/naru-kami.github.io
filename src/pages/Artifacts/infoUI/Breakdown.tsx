import { useState, useMemo, useCallback, useEffect } from "react"
import {
  Card, Typography, IconButton, CardActions, TableContainer, Table,
  TableHead, TableRow, TableCell, TableBody, Box, Dialog, DialogTitle,
  DialogContent, Select, FormControl, MenuItem, SelectChangeEvent
} from "@mui/material"
import { Help, Close } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { useStore, readStore } from "../Data/Store";
import { roundSigfig } from "../../Wishing/utils";

const CloseButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.getContrastText(red[700]),
  backgroundColor: red[700],
  "&:hover": {
    backgroundColor: red[900],
  },
}));

function createData(
  name: string,
  data: number,
  subsection?: boolean
) {
  return { name, data, subsection };
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main,
  "&:last-child td, &:last-child th": {
    border: 0,
    borderTop: "3px solid rgb(81, 81, 81)"
  },
}));

export default function Breakdown() {
  const [open, setOpen] = useState(false);
  const toggleOpen = useCallback(() => setOpen(o => !o), [setOpen]);

  const [unit, setStore] = useStore(store => store.unit);
  const [chances] = useStore(store => store.chances);
  const [resinPerDay] = useStore(store => store.supplementary[3]);
  const source = readStore(store => store.supplementary[2]);

  const dropSource = useMemo(() => source, [chances]);

  const handleUnitChange = useCallback((event: SelectChangeEvent<number>) => {
    setStore(p => {
      p.unit = Number(event.target.value);
      return p;
    });
  }, [setStore]);

  const resinCost = useMemo(() => [20, 20, 40, 60, 0, 0][dropSource], [chances, unit]);

  const E = useMemo(() => {
    const single = (() => {
      if (!chances.final) return 0;

      if (dropSource) {
        return 1 / (chances.final * (1 + chances.doubleDropRate * (1 - chances.final)));
      } else { // Stygian onslaught
        let f = (1 - chances.final) * (1 - chances.final * chances.doubleDropRate);
        return (1 - f ** 6) / ((1 - f) * (1 - f ** 6 * (1 - chances.final)));
      }
    })();
    return single * [resinCost / resinPerDay, resinCost, 1][unit];
  }, [chances, unit, resinPerDay]);

  const tabledata = useMemo(() => [
    createData("Main affix configuration", chances.mainstatConfig),
    createData("Minor affix configuration", chances.substatConfig),
    createData("Upgrade Rolls", chances.fourLinerUpgrade + chances.threeLinerUpgrade),
    createData("├─ 4 initial minor affixes", chances.fourLinerUpgrade, true),
    createData("└─ 3 initial minor affixes", chances.threeLinerUpgrade, true),
    createData("Artifact set", chances.onsetChance),
    createData("Artifact chance per drop", chances.final)
  ], [chances]);

  return (
    <Card elevation={2} sx={{ px: 1 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0px 8px" }}>
        <Typography> Average: {Math.round((E + Number.EPSILON) * 100) / 100} </Typography>
        <FormControl variant="standard" sx={{ m: 1, mr: "auto" }}>
          <Select id="Select-Unit" value={unit} onChange={handleUnitChange} sx={{ px: 0.5 }}>
            {dropSource in [0, 0, 0, 0] && <MenuItem value={0}>Days</MenuItem>}
            {dropSource in [0, 0, 0, 0] && <MenuItem value={1}>Resin</MenuItem>}
            <MenuItem value={2}>Artifacts</MenuItem>
          </Select>
        </FormControl>
        <CardActions>
          <IconButton aria-label="help" onClick={toggleOpen} >
            <Help />
          </IconButton>
        </CardActions>
      </Box>
      <Dialog open={open} onClose={toggleOpen}>
        <DialogTitle variant="subtitle1">
          <CloseButton onClick={toggleOpen} sx={{ width: "30px", height: "30px", borderRadius: 1, float: "right", ml: 3 }}>
            <Close />
          </CloseButton>
          A breakdown of the probability of obtaining the desired artifact per run.
        </DialogTitle>
        <DialogContent>
          <TableContainer sx={{ mt: 2 }}>
            <Table size="small" aria-label="data table">
              <TableHead>
                <TableRow sx={{ borderBottom: "3px solid rgb(81, 81, 81)", backgroundColor: theme => theme.palette.secondary.main }}>
                  <TableCell >Assumption</TableCell>
                  <TableCell align="right">Chance</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tabledata.map((row, i) => (
                  <StyledTableRow key={i} sx={{ opacity: row.subsection ? 0.6 : undefined }}>
                    <TableCell sx={{ pl: row.subsection ? 4 : undefined }}>{row.name}</TableCell>
                    <TableCell align="right">{roundSigfig(row.data * 100)} %</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>
    </Card>
  )
}