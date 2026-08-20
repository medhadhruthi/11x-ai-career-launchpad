import React from 'react';
import ReactDOM from 'react-dom/client';
import { MainApp } from './App';
import { AppProvider } from './context/AppContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <MainApp />
    </AppProvider>
  </React.StrictMode>
);
