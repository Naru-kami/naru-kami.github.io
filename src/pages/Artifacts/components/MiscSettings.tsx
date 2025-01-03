import { Select, MenuItem, InputLabel, FormControl, styled, SelectChangeEvent, Card } from '@mui/material';
import { ArtifactStore, useStore } from '../Data/Store';

const StyledPaper = styled(Card)(({ theme }) => ({
  marginBlock: 5,
  borderRadius: 6,
  outline: '1px solid ' + theme.palette.divider,
  outlineOffset: -1,
}));

const StyledSelect = styled(Select)(() => ({
  color: '#FFF',
  backgrondColor: '#242734',
  margin: '0.75rem',
  "& .MuiSvgIcon-root": {
    color: "#CCC"
  }
}));


function SetOption() {
  const [misc, setStates] = useStore((store: ArtifactStore) => store.starter[0]);

  const changeSet = (event: SelectChangeEvent<unknown>) => {
    setStates((prev: ArtifactStore) => {
      var temp = { ...prev };
      temp.starter[0] = event.target.value as number;
      return temp;
    });
  }
  return (
    <FormControl sx={{ width: '100%' }} size="small">
      <InputLabel id="set" sx={{ m: 1.5, color: "#FFF" }}>Artifact set option</InputLabel>
      <StyledSelect value={misc} onChange={changeSet} label="Artifact set option" sx={{ mb: 0.75 }}>
        <MenuItem value={2} sx={{ color: '#FFF' }}> Use On-Set Artifact </MenuItem>
        <MenuItem value={1} sx={{ color: '#FFF' }}> Use Off-Set Artifact </MenuItem>
      </StyledSelect>
    </FormControl>
  );
}

function StartingOption() {
  const [misc, setStates] = useStore((store: ArtifactStore) => store.starter[1]);

  const changeStarting = (event: SelectChangeEvent<unknown>) => {
    setStates((prev: ArtifactStore) => {
      var temp = { ...prev };
      temp.starter[1] = event.target.value as number;
      return temp;
    });
  }

  return (
    <FormControl sx={{ width: '100%' }} size="small">
      <InputLabel id="starting" sx={{ m: 1.5, color: "#FFF" }}>Starting Substats</InputLabel>
      <StyledSelect value={misc} onChange={changeStarting} label="Starting Substats">
        <MenuItem value={0} sx={{ color: '#FFF' }}> Any </MenuItem>
        <MenuItem value={1} sx={{ color: '#FFF' }}> 4 </MenuItem>
        <MenuItem value={2} sx={{ color: '#FFF' }}> 3 </MenuItem>
      </StyledSelect>
    </FormControl>
  )
}

export default function MiscSettings() {
  return (
    <StyledPaper elevation={2}>
      <SetOption />
      <StartingOption />
    </StyledPaper>
  );
}
