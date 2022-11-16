import * as React from 'react';
import {Box, Card, Grid, Typography, Button, Tooltip} from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ArtifactUpgradeSlider from './components/ArtifactUpgradeSlider';
import SubDropdown from './components/SubDropdown';
import ArtifactMainProps from './components/ArtifactMainProps';
import MiscSettings from './components/MiscSettings';
import Resin from './components/Resin';
import Artichance from './Artichance';
import Chart from './infoUI/Chart';
import Breakdown from './infoUI/Breakdown';
import ReplayIcon from '@mui/icons-material/Replay';
import { purple } from '@mui/material/colors';
import Info from './infoUI/Info'
import { useLocalStorage } from '../../hooks/useLocalStorage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const ResetButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[800]),
  backgroundColor: purple[800],
  '&:hover': {
    backgroundColor: purple[900],
  },
}));

function RESET_ALL() {
  localStorage.clear();
  window.location.reload();
}

export default function RangeSlider() {
  const [sliderVals, setsliderVals] = useLocalStorage( "storage.sliderVals", () => [[0,1],[0,0],[0,5],[0,5]])
  const [subvals, setsubvals] = useLocalStorage('storage.subvals', () => [4,7,8,9] );
  const [mainvals, setmainvals] = useLocalStorage('storage.mainvals', () => [0, 0] );
  const [misc, setmisc] = useLocalStorage('storage.misc', () => [2, 0]);
  const [resins, setresins] = useLocalStorage('storage.resins', () => [20, 180]);
  const [sliderMax, setsliderMax] = useLocalStorage('storage.sliderMax', () => 5);
  const [plotdata, setPlotdata] = useLocalStorage('storage.plotdata', () => ({x:[], y:[]}) );
  const [trials, settrials] = useLocalStorage('storage.trials', () => 9);
  const artidistr = React.useRef( JSON.parse( localStorage.getItem('storage.artidistr') ) || ({}) );

  React.useEffect(() => {
    localStorage.setItem('storage.artidistr', JSON.stringify( artidistr.current ));
  }, [artidistr.current])

  function passSliderVals(id, val) {
    setsliderVals( prevsliderVals => {
      var c = [...prevsliderVals];
      c[id] = val;
      return c;
    } );
  }
  function passSubvals(id, val) {
    setsubvals( prevsubvals => {
      var c = [...prevsubvals];
      c[id] = val;
      return c;
    } );
  }
  function passMainvals(val) { setmainvals(val); }
  function passMisc(val) { setmisc(val); }
  function passResin(val) { setresins(val); }
  function passPlotdata(val) {setPlotdata(p => ({...p, x: val.x, y: val.y})); }
  function updateartichance(val) { artidistr.current = val; }
  function updateTrials(val) {settrials(val); }
  console.log(localStorage.getItem('storage.goblet'))
  React.useEffect(() => {
    if(misc[1]===2)
      setsliderMax(4);
    else
      setsliderMax(5);
  }, [misc[1]]);

  return (
  <ThemeProvider theme={darkTheme}>
    <Box display="flex" flexDirection="column" gap={1} minWidth={300} sx={{m: 2}}>
      <Grid container spacing={2}>
        <Grid item xs ={12} xl={6} style={{maxWidth: '1200px', margin: '0px auto 0px auto'}}> {/* input */}
          <Grid item xs ={12}>
            <Card sx={{boxShadow: 0,p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none'}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={5} order={{ sm: 1, xs: 2}}>
                  <ArtifactMainProps mainprops={mainvals} passMainvals={passMainvals} />
                </Grid>
                <Grid item xs={12} sm={7} order={{ sm: 2, xs: 1}} sx={{pb: 1}}>
                  <Info />
                </Grid>
                <Grid item xs={12} sm={12} order={{sm:3, xs: 3}}>
                  <Card sx={{boxShadow: 0, mt: 1, bgcolor: 'inherit', backgroundImage: 'none'}}>
                    <Typography sx={{textAlign: 'center'}}>Substats</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <Grid container spacing={'3px'}>
                          <Grid item xs={12} sm={5} sx={{pr: '5px'}}>
                            <SubDropdown startval={subvals[0]} passSubvals={passSubvals} mainval={mainvals} id={0}/>
                          </Grid>
                          <Grid item xs={12} sm={7} sx={{pr: '5px'}}>
                            <ArtifactUpgradeSlider startMin={sliderVals[0][0]} startMax={sliderVals[0][1]} setMax={sliderMax} passValues={passSliderVals} id={0} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={'3px'}>
                          <Grid item xs={12} sm={5} sx={{pr: '5px'}}>
                            <SubDropdown startval={subvals[1]} passSubvals={passSubvals} mainval={mainvals} id={1}/>
                          </Grid>
                          <Grid item xs={12} sm={7} sx={{pr: '5px'}}>
                            <ArtifactUpgradeSlider startMin={sliderVals[1][0]} startMax={sliderVals[1][1]} setMax={sliderMax} passValues={passSliderVals} id={1} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={'3px'}>
                          <Grid item xs={12} sm={5} sx={{pr: '5px'}}>
                            <SubDropdown startval={subvals[2]} passSubvals={passSubvals} mainval={mainvals} id={2}/>
                          </Grid>
                          <Grid item xs={12} sm={7} sx={{pr: '5px'}}>
                            <ArtifactUpgradeSlider startMin={sliderVals[2][0]} startMax={sliderVals[2][1]} setMax={sliderMax} passValues={passSliderVals} id={2} />
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={12}>
                        <Grid container spacing={'3px'}>
                          <Grid item xs={12} sm={5} sx={{pr: '5px'}}>
                            <SubDropdown startval={subvals[3]} passSubvals={passSubvals} mainval={mainvals} id={3}/>
                          </Grid>
                          <Grid item xs={12} sm={7} sx={{pr: '5px'}}>
                            <ArtifactUpgradeSlider startMin={sliderVals[3][0]} startMax={sliderVals[3][1]} setMax={sliderMax} passValues={passSliderVals} id={3} />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} sx={{mt: 3}}>
            <Card sx={{boxShadow: 0,p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none'}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={8} >
                  <Resin resins={resins} passResin={passResin} />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
                  <MiscSettings passMisc={passMisc} misc={misc}/>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <div style={{width: '100%', display: 'flex'}}>
              <Artichance mainstats={mainvals} substats={subvals} starter={misc} slidervals={sliderVals} trials={resins[1]/resins[0]} pass={passPlotdata} updateartichance={updateartichance} updateTrials={updateTrials} />
              <Tooltip title={<Typography>Reset all values to its preset</Typography>} arrow placement='top'>
                <ResetButton sx={{m: '24px 8px 8px auto', minWidth: '36px'}} onClick={RESET_ALL}> <ReplayIcon /> </ResetButton>
              </Tooltip>
            </div>
          </Grid>
        </Grid>
        <Grid item xs ={12} xl={6} style={{maxWidth: '1200px', margin: '0px auto 0px auto'}}> {/* output stats + graph */}
          <Grid container spacing={1}>
            <Grid item xs={12} xl={12} order={{xs: 1, xl: 2}}>
              <Breakdown artichance={artidistr.current} trials={trials}/>
            </Grid>
            <Grid item xs={12} xl={12} order={{xs: 2, xl: 1}}>
              <Chart plotdata={plotdata}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </ThemeProvider>
  );
}