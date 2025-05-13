import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from "@/context/AuthContext";
import { QueryProvider } from './lib/react-query/QueryProvider';
import React from 'react';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
          <App />
    </BrowserRouter>
  </React.StrictMode>,
)
