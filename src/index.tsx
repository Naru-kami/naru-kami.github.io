import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { Route, Routes, Navigate, HashRouter } from "react-router-dom";
import { Box, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Navbar from './components/NavBar';
import Home from './pages/Home/Main';
import '../style.css';
import Footer from './components/Footer';

const Artifacts = lazy(() => import('./pages/Artifacts/Main'));
const Wishing = lazy(() => import('./pages/Wishing/Main'));

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: 'hsl(230, 43%, 8%)',
      paper: 'hsl(230, 65%, 7%)',
    },
    primary: {
      main: '#307ac3'
    },
    secondary: {
      main: '#1B1D2A'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        color: '#42a5f5'
      },
    }
  }
});

let container: HTMLElement | null = null;

document.addEventListener('DOMContentLoaded', function (event) {
  if (!container) {
    container = document.getElementById('root') as HTMLElement;
    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <HashRouter>
            <Box display={'flex'} flexDirection={'column'} minHeight={'100vh'} position={'relative'}>
              <Navbar />
              <Suspense fallback={null}>
                <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/Wishing' element={<Wishing />} />
                  <Route path='/Artifacts' element={<Artifacts />} />
                  <Route path='*' element={<Navigate to='/' />} />
                </Routes>
              </Suspense>
              <Box flexGrow={1}></Box>
              <Footer />
            </Box>
          </HashRouter>
        </ThemeProvider>
      </React.StrictMode>
    );
  }
});

console.log(`
⣿⣿⠏⠁⠄⠄⠄⠄⠄⠄⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠐⠶⠄⠉⠻⣿⣿⣿
⠁⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⡀⠄⠄⠄⠄⠄⠄⠄⠄⠄⠢⠄⡀⠄⠸⣿⣿
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣰⣾⠿⠶⠂⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠙⠿
⠄⠄⠄⠄⠄⠄⠄⣀⣴⠿⡓⠤⢂⣤⠄⠄⠄⣴⣢⣶⣦⠄⠄⠡⠰⠠⡀⠄⠄
⠄⠄⠄⠄⠄⠄⠾⠋⠄⠄⠄⠐⠋⠄⠄⣠⠾⣿⣿⣿⣿⡧⠄⠄⠉⠁⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⣠⣤⣶⣾⣿⣿⣿⣿⣿⣄⠄⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢺⣿⣿⣿⠟⠛⠛⠉⠉⠭⣭⣷⠄⠄⠄⠄⠄
⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⢀⣼⣿⣿⣷⣶⣿⣶⣶⣿⣶⣾⣿⠄⠄⠄⠄⢀
⠄⠄⠄⠄⠄⠄⣀⣀⣀⣠⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠄⠄⠄⢀⣾
⠄⠄⠄⠄⠄⠄⣿⣿⣿⣿⡿⠛⠻⣿⣿⠿⢿⣿⣿⣿⣿⣿⠟⠃⠄⠄⢠⣿⣿
⣦⠄⠄⠄⠄⠄⠈⢿⣿⣿⣿⣶⣤⣤⣤⣤⣾⣿⣿⣿⣿⡏⠄⠄⠄⠠⣾⣿⣿
⢿⣷⡄⠄⢀⠄⠄⠘⣿⣦⠄⠄⠤⣤⣤⣤⣠⣭⣼⡿⠁⠄⡀⢀⣤⣰⣿⣿⣿
⣿⣿⣇⢠⣼⡇⠄⠄⠘⢿⣷⣶⣦⣤⣤⣶⣿⣿⡿⠁⠄⠄⠁⢸⣿⣿⣿⣿⣿
⠙⢻⣿⣿⡿⠇⠄⠄⠄⠄⠈⠙⠻⠿⠿⠟⠛⠋⠄⣀⣤⠄⠄⠄⠈⠻⣿⣿⣿
`)