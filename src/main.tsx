import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';

import { AppBootstrap } from './app/bootstrap';
import { AppErrorBoundary } from './app/providers/AppErrorBoundary';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppErrorBoundary>
      <AppBootstrap />
    </AppErrorBoundary>
  </React.StrictMode>
);

