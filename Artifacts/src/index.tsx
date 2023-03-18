import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from './components/NavBar';
import { Skeleton } from '@mui/material';
import '../style.css';

const Artifacts = lazy(() => import('./pages/Artifacts/Main'));
const Wishing = lazy(() => import('./pages/Wishing/Main'));

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<Skeleton variant="rectangular" sx={{ height: "100dvh", bgcolor: '#FFFFFF21', m: 2, borderRadius: '5px' }} />}>
        <Routes>
          <Route path='/' element={<div style={{ color: '#FFF', margin: 8 }}>HI</div>} />
          <Route path='/Wishing' element={<Wishing />} />
          <Route path='/Artifacts' element={<Artifacts />} />
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);

