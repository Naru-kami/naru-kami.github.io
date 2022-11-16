import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/NavBar';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Artifacts = lazy( () => import('./pages/Artifacts/Main'));
const Wishing = lazy( () => import('./pages/Wishing/Main'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={
        <Backdrop sx={{color: '#fff'}} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop> }>
        <Routes> 
          <Route path='/' element={<div style={{color:'#FFF'}}>HI</div>} />
          <Route path='/Wishing' element={<Wishing />} />
          <Route path='/Artifacts' element={<Artifacts/>} />
          <Route path='*' element={<Navigate to='/'/>} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

