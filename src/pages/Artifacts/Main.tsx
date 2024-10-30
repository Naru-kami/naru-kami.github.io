import { Suspense, lazy } from 'react';
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
      <Card elevation={1} sx={{ p: 1, m: 1, minWidth: 300, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} xl={5} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
            <Grid item xs={12}>
              <Card elevation={2} sx={{ p: 1.5 }}>
                <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '384px', bgcolor: '#FFFFFF21' }} />}>
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={5} order={{ sm: 1, xs: 2 }}>
                      <ArtifactMainProps />
                    </Grid>
                    <Grid item xs={12} sm={7} order={{ sm: 2, xs: 1 }} sx={{ pb: 1 }}>
                      <Info />
                    </Grid>
                    <Grid item xs={12} sm={12} order={{ sm: 3, xs: 3 }}>
                      <Box sx={{ mt: 1 }}>
                        <Typography sx={{ textAlign: 'center' }}>Substats</Typography>
                        <Grid container spacing={2}>
                          {[0, 1, 2, 3].map(e => {
                            return (
                              <Grid key={e} item xs={12}>
                                <Grid container spacing={'3px'}>
                                  <Grid item xs={12} sm={5} sx={{ pr: { sm: '5px', xs: 0 } }}>
                                    <SubDropdown id={e} />
                                  </Grid>
                                  <Grid item xs={12} sm={7}>
                                    <UpgradeSlider id={e} />
                                  </Grid>
                                </Grid>
                              </Grid>
                            )
                          })}
                        </Grid>
                      </Box>
                    </Grid>
                  </Grid>
                </Suspense>
              </Card>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <Card elevation={2} sx={{ p: 1 }}>
                <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '136px', bgcolor: '#FFFFFF21' }} />}>
                  <Grid container spacing={2}>
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
              <Suspense fallback={<Skeleton variant="rounded" sx={{ height: '68px', bgcolor: '#FFFFFF21', my: 2 }} />}>
                <Card elevation={2} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 1, mt: 2, mb: 1, p: 1 }}>
                  <Artichance />
                  <StorageResetter />
                </Card>
              </Suspense>
            </Grid>
          </Grid>
          <Grid item xs={12} xl={7} style={{ maxWidth: '1100px', margin: '0px auto 0px auto' }}>
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
      </Card>
    </Provider>
  );
}