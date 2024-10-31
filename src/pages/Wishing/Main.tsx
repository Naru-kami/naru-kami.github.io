import React, { lazy, Suspense, useState } from 'react'
import { Tabs, Box, Tab, Typography, Skeleton, Card, styled } from '@mui/material';
import Provider from './Store';
import Simulation from './Simulation/Simulation';
import { SwitcherProvider } from './InputCards/CurrencySwitcher';

const Calculation = lazy(() => import('./Statistic/Calculation'));

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index } = props;

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {value === index && <>{children}</>}
    </Box>
  );
}

const StyledTabs = styled(Tabs)(({ theme }) => ({
  isolation: "isolate",
  ".Mui-selected.Mui-selected": {
    backgroundColor: '#ffffff0c',
    color: theme.palette.primary.contrastText
  }
}))

const StyledTab = styled(Tab)(() => ({
  paddingInline: '1rem',
  borderRadius: "6px 6px 0 0",
  '&:hover': { backgroundColor: '#ffffff0c' },
  transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)'
}))

export default function Main() {
  const [value, setValue] = useState(0);

  return (
    <Provider>
      <SwitcherProvider>
        <Card elevation={1} sx={{ p: 1, m: 1, minWidth: 360 }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
            <StyledTabs
              value={value} centered
              onChange={(e, v) => setValue(v)}
              TabIndicatorProps={{ sx: { boxShadow: "0px 0px 35px 15px rgba(48, 122, 195, .4)", borderRadius: 1, zIndex: -1 } }}
            >
              <StyledTab label={<Typography fontWeight={500}> Calculation </Typography>} />
              <StyledTab label={<Typography fontWeight={500}> Simulation </Typography>} />
            </StyledTabs>
          </Box>
          <TabPanel value={value} index={0}>
            <Suspense fallback={<Skeleton variant="rounded" sx={{ height: "80vh", width: '100%', backgroundColor: '#FFFFFF21', m: 2 }} />}>
              <Calculation />
            </Suspense>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Simulation />
          </TabPanel>
        </Card>
      </SwitcherProvider>
    </Provider>
  )
}
