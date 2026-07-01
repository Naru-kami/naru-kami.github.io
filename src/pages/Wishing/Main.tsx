import { Suspense } from 'react'
import { Tabs, Box, Tab, Typography, Skeleton, Card, styled } from '@mui/material';
import Provider from './Store';
import { SwitcherProvider } from './InputCards/CurrencySwitcher';
import { Link, Outlet, useLocation } from 'react-router-dom';

const StyledTabs = styled(Tabs)(({ theme }) => ({
  isolation: "isolate",
  ".Mui-selected.Mui-selected": {
    backgroundColor: '#ffffff0c',
    color: theme.palette.primary.contrastText
  }
}))

const tabsx = {
  paddingInline: '1rem',
  borderRadius: "6px 6px 0 0",
  '&:hover': { backgroundColor: '#ffffff0c' },
  transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)'
}

export default function Main() {
  const location = useLocation();
  const pathname = location.pathname.split('/')[2];

  return (
    <Provider>
      <SwitcherProvider>
        <Card elevation={1} sx={{ p: 1, m: 1, minWidth: 360 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <StyledTabs
              value={pathname?.includes("Simulation") ? "Simulation" : "Calculation"}
              centered
              TabIndicatorProps={{ sx: { boxShadow: "0px 0px 35px 15px rgba(48, 122, 195, .4)", borderRadius: 1, zIndex: -1 } }}
            >
              <Tab
                label={<Typography fontWeight={500}> Calculation </Typography>}
                component={Link}
                to="Calculation"
                value="Calculation"
                sx={tabsx}
              />
              <Tab
                label={<Typography fontWeight={500}> Simulation </Typography>}
                component={Link}
                to="Simulation"
                value="Simulation"
                sx={tabsx}
              />
            </StyledTabs>
          </Box>
          <Suspense fallback={<Skeleton variant="rounded" sx={{ height: "80vh", width: '100%', backgroundColor: '#FFFFFF21', m: 2 }} />}>
            <Outlet />
          </Suspense>
        </Card>
      </SwitcherProvider>
    </Provider>
  )
}
