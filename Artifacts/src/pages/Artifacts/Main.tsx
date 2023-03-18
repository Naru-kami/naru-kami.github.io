import React from 'react';
import { Box, Card, Grid, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import SubDropdown from './components/SubDropdown';
import UpgradeSlider from './components/UpgradeSlider';
import ArtifactMainProps from './components/ArtifactMainProps';
import MiscSettings from './components/MiscSettings';
import Resin from './components/Resin';
import Artichance from './Artichance';
import Chart from './infoUI/Chart';
import Breakdown from './infoUI/Breakdown';
import Info from './infoUI/Info'
import Provider from './Data/Store';
import StorageResetter from './Data/StoreResetter';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Main() {
  return (
    <ThemeProvider theme={darkTheme}>
      <Provider>
        <Box display="flex" flexDirection="column" gap={1} minWidth={300} sx={{ m: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} xl={6} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
              <Grid item xs={12}>
                <Card sx={{ p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={5} order={{ sm: 1, xs: 2 }}>
                      <ArtifactMainProps />
                    </Grid>
                    <Grid item xs={12} sm={7} order={{ sm: 2, xs: 1 }} sx={{ pb: 1 }}>
                      <Info />
                    </Grid>
                    <Grid item xs={12} sm={12} order={{ sm: 3, xs: 3 }}>
                      <Card sx={{ boxShadow: 0, mt: 1, bgcolor: 'inherit', backgroundImage: 'none' }}>
                        <Typography sx={{ textAlign: 'center' }}>Substats</Typography>
                        <Grid container spacing={2}>
                          {[0, 1, 2, 3].map(e => {
                            return (
                              <Grid key={e} item xs={12}>
                                <Grid container spacing={'3px'}>
                                  <Grid item xs={12} sm={5} sx={{ pr: '5px' }}>
                                    <SubDropdown id={e} />
                                  </Grid>
                                  <Grid item xs={12} sm={7} sx={{ pr: '5px' }}>
                                    <UpgradeSlider id={e} />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )
                          })}
                        </Grid>
                      </Card>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sx={{ mt: 3 }}>
                <Card sx={{ p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none' }}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8} >
                      <Resin />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <MiscSettings />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <Artichance />
                  <StorageResetter />
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12} xl={6} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
              <Grid container spacing={1}>
                <Grid item xs={12} xl={12} order={{ xs: 1, xl: 2 }}>
                  <Breakdown />
                </Grid>
                <Grid item xs={12} xl={12} order={{ xs: 2, xl: 1 }}>
                  <Chart />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Provider>
    </ThemeProvider>
  );
}