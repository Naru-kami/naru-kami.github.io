import React, { lazy, Suspense } from 'react'
import { Tabs, Box, Tab, Typography, Skeleton } from '@mui/material';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Provider from './Store';

const Simulation = lazy(() => import('./Simulation/Simulation'));
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
  const [value, setValue] = useLocalStorage("Wishing.Tab", 0);

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
          <Suspense fallback={<Skeleton variant="rounded" sx={{ height: "80vh", width: '100%', backgroundColor: '#FFFFFF21', m: 2 }} />}>
            <Simulation />
          </Suspense>
        </TabPanel>
      </Box>
    </Provider>
  )
}
