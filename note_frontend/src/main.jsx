import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { AuthProvider } from './contexts/AuthContext.jsx';
import router from './router.jsx';
import { RouterProvider } from 'react-router-dom';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router}/>
    </AuthProvider>,
  </StrictMode>,
)
