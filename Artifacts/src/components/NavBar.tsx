import { Box, Tab, Tabs, AppBar } from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

export default function NavBar() {
  const location = useLocation();

  return (
    <Box>
      <AppBar position="sticky" sx={{ bgcolor: '#242734', display: "flex", flexWrap: "nowrap" }}>
        <Tabs value={location.pathname}>
          <Tab label="Genshin Statistics" component={Link} to="/" value="/" sx={{ color: '#FFF' }} />
          <Tab label="Wishing" component={Link} to="/Wishing" value="/Wishing" sx={{ color: '#FFF' }} />
          <Tab label="Artifact" component={Link} to="Artifacts" value="/Artifacts" sx={{ color: '#FFF' }} />
        </Tabs>
      </AppBar>
    </Box>
  )
}
