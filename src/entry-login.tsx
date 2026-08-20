import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Login from './pages/Login';
import './index.css';
import { register } from './registerServiceWorker';

register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Login />
  </StrictMode>,
);
