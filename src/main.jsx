import './index.css'
import React from 'react';
import App from './App.jsx'
import ReactDOM from 'react-dom/client';
import { ResultadoProvider } from './wizard/ResultadoContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResultadoProvider>
      <App />
    </ResultadoProvider>
  </React.StrictMode>
);
