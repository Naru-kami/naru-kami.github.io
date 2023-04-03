import React, { Suspense, lazy } from 'react';
import { Box, Card, Grid, Skeleton, Typography } from '@mui/material';
import Provider from './Data/Store';

const ArtifactMainProps = lazy(() => import('./components/ArtifactMainProps'));
const Info = lazy(() => import('./infoUI/Info'));
const SubDropdown = lazy(() => import('./components/SubDropdown'));
const UpgradeSlider = lazy(() => import('./components/UpgradeSlider'));

const Resin = lazy(() => import('./components/Resin'));
const MiscSettings = lazy(() => import('./components/MiscSettings'));

const Artichance = lazy(() => import('./Artichance'));
const StorageResetter = lazy(() => import('./Data/StoreResetter'));

const Chart = lazy(() => import('./infoUI/Chart'));
const Breakdown = lazy(() => import('./infoUI/Breakdown'));

export default function Main() {
  return (
    <Provider>
      <Box display="flex" flexDirection="column" gap={1} minWidth={300} sx={{ m: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={6} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
            <Grid item xs={12}>
              <Card sx={{ p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none' }}>
                <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '384px', bgcolor: '#FFFFFF21' }} />}>
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
                </Suspense>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ mt: 3 }}>
              <Card sx={{ p: 1, bgcolor: '#1B1D2A', backgroundImage: 'none' }}>
                <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '136px', bgcolor: '#FFFFFF21' }} />}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={8} >
                      <Resin />
                    </Grid>
                    <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <MiscSettings />
                    </Grid>
                  </Grid>
                </Suspense>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '68px', bgcolor: '#FFFFFF21', my: '1em' }} />}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', gap: 8, marginBottom: 8, marginTop: 24 }}>
                  <Artichance />
                  <StorageResetter />
                </div>
              </Suspense>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={6} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
            <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '522px', bgcolor: '#FFFFFF21' }} />}>
              <Grid container spacing={1}>
                <Grid item xs={12} xl={12} order={{ xs: 1, xl: 2 }}>
                  <Breakdown />
                </Grid>
                <Grid item xs={12} xl={12} order={{ xs: 2, xl: 1 }}>
                  <Chart />
                </Grid>
              </Grid>
            </Suspense>
          </Grid>
        </Grid>
      </Box>
    </Provider>
  );
}