import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import LimeGreenSPL from './pages/LimeGreenSPL';
import './index.css';
import { register } from './registerServiceWorker';

register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LimeGreenSPL />
  </StrictMode>,
);
