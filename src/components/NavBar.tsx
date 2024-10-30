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

const drawerWidth = 220;

function DynamicTabs({ location }: { location: Location }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box style={{ display: 'flex' }}>
      <AppBar component="nav" sx={{ position: 'absolute', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Tab
          label={<Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1}> Genshin Statistics </Typography>}
          component={Link}
          to="/"
          value="/"
          sx={{ color: '#FFF', opacity: 1, display: { sm: 'none' } }} />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          sx={{ mr: 1, display: { sm: 'none' }, width: "3rem", height: "3rem" }}>
          <MenuIcon fontSize='large' />
        </IconButton>
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
          anchor={"right"}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, bgcolor: "#1B1D2A", backgroundImage: 'none' },
          }}
        >
          <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
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
  const verHeight = orientation === "vertical" ? '36px' : '24px';
  const backgroundColor = orientation === "vertical" ? '#307ac3' : 'transparent';
  const backgroundImage = orientation === "vertical" ? 'linear-gradient(-90deg, #0000, color-mix(in oklch, #307ac3 50%, #0000))' : 'linear-gradient(#0000, color-mix(in oklch, #307ac3 30%, #0000))';
  const m = orientation === "vertical" ? '0 8px 0 0' : '0';
  const borderRadius = orientation === "vertical" ? '0 8px 8px 0' : '8px 8px 0 0';

  return (
    <Tabs
      value={location.pathname}
      orientation={orientation ?? "horizontal"}
      TabIndicatorProps={{ sx: { right: 'auto', left: 0 } }}
      sx={{ '.Mui-selected.Mui-selected': { backgroundColor: '#242734', color: '#FFF', backgroundImage } }}
    >
      <Tab
        label={
          <Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1}
            sx={{ height: verHeight, display: 'flex', alignItems: 'center' }}>
            Genshin Statistics
          </Typography>
        }
        component={Link}
        to="/"
        value="/"
        sx={{ color: '#FFF', borderRadius }}
        style={{ backgroundColor }}
      />
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', px: 1 }}>
            <img src={wish} width={24} height={24} style={{ flex: 0 }} />
            <Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1} sx={{ flex: 1 }}>
              Wishing
            </Typography>
          </Box>
        }
        component={Link}
        to="/Wishing"
        value="/Wishing"
        sx={{ color: '#FFF', '&:hover': { bgcolor: '#242734' }, transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)', borderRadius, m }}
      />
      <Tab
        label={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%', px: 1 }}>
            <img src={artifact} width={24} height={24} style={{ flex: 0 }} />
            <Typography fontWeight={600} fontSize={16} variant="h2" letterSpacing={1} style={{ flex: 1 }}>
              Artifacts
            </Typography>
          </Box>
        }
        component={Link}
        to="/Artifacts"
        value="/Artifacts"
        sx={{ color: '#FFF', '&:hover': { bgcolor: '#242734' }, transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)', borderRadius, m }}
      />
    </Tabs>
  )
}
