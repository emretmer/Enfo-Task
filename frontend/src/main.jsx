import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../public/locales/i18n'; // i18n konfigürasyonunu dahil et

// Vite ile uygulamayı render etme
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);