import React, { lazy, Suspense, useState } from 'react'
import { Tabs, Box, Tab, Typography, Skeleton } from '@mui/material';
import Provider from './Store';
import Simulation from './Simulation/Simulation';

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
      {value === index && (
        <>
          {children}
        </>
      )}
    </Box>
  );
}

export default function Main() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Provider>
      <Box minWidth={360} sx={{ p: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={value} onChange={handleChange} centered >
            <Tab label={<Typography fontWeight={500}> Calculation </Typography>} sx={{ px: 2 }} />
            <Tab label={<Typography fontWeight={500}> Simulation </Typography>} sx={{ px: 2 }} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Suspense fallback={<Skeleton variant="rounded" sx={{ height: "80vh", width: '100%', backgroundColor: '#FFFFFF21', m: 2 }} />}>
            <Calculation />
          </Suspense>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Simulation />
        </TabPanel>
      </Box>
    </Provider>
  )
}
