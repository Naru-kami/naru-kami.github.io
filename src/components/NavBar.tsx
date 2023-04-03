import React, { useState, Suspense } from 'react';
import { Box, Tab, Tabs, AppBar, Typography, Drawer, Toolbar, IconButton, Skeleton } from '@mui/material'
import { Link, Location, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import wish from '/Wish.png';
import artifact from '/Artifact.png';

export default function NavBar() {
  const location = useLocation();
  return (
    <Suspense fallback={<Skeleton variant="rectangular" width="100%" height="40px" />}>
      <DynamicTabs location={location} />
    </Suspense>
  )
}

const drawerWidth = 240;

function DynamicTabs({ location }: { location: Location }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ bgcolor: '#242734', backgroundImage: 'none', display: 'flex', flexDirection: 'row' }}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ ml: 1, display: { sm: 'none' }, width: "3rem", height: "3rem" }}>
          <MenuIcon fontSize='large' />
        </IconButton>
        <Tab
          label={<Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1}> Genshin Statistics </Typography>}
          component={Link}
          to="/"
          value="/"
          sx={{ color: '#FFF', opacity: 0.9, display: { sm: 'none' } }} />
        <Box sx={{ display: { xs: 'none', sm: 'block', width: '100%' } }}>
          <Links location={location} />
        </Box>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#242734", backgroundImage: 'none' },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', pt: 1 }}>
            <Links location={location} orientation="vertical" />
          </Box>
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 0 }}>
        <Toolbar />
      </Box>
    </Box>
  );
}

function Links({ location, orientation }: { location: Location, orientation?: "horizontal" | "vertical" }) {
  const col = orientation === "vertical" ? '#FFFFFF80' : '#FFF';
  const divider = orientation === "vertical" ? "1px solid #FFFFFF30" : "0";
  return (
    <Tabs value={location.pathname} orientation={orientation ?? "horizontal"}>
      <Tab
        label={<Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1}> Genshin Statistics </Typography>}
        component={Link}
        to="/"
        value="/"
        sx={{ color: col, borderBottom: divider }} />
      <Tab
        label={
          <Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={wish} width={24} height={24} />
            Wishing
          </Typography>}
        component={Link}
        to="/Wishing"
        value="/Wishing"
        sx={{ color: '#FFF' }} />
      <Tab
        label={
          <Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <img src={artifact} width={24} height={24} />
            Artifacts
          </Typography>}
        component={Link}
        to="/Artifacts"
        value="/Artifacts"
        sx={{ color: '#FFF' }} />
    </Tabs>
  )
}
