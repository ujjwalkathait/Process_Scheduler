import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import React from 'react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <ProcessProvider>
        <App />
      </ProcessProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
