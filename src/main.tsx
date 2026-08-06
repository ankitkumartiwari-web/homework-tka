import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles.css';

function getBasename() {
  if (import.meta.env.BASE_URL && import.meta.env.BASE_URL !== './') {
    return import.meta.env.BASE_URL;
  }

  const firstPathSegment = window.location.pathname.split('/').filter(Boolean)[0];
  return firstPathSegment ? `/${firstPathSegment}/` : '/';
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={getBasename()}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
