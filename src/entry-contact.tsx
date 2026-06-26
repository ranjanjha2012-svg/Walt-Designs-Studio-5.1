import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Contact from './pages/Contact';
import './index.css';
import { register } from './registerServiceWorker';

register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Contact />
  </StrictMode>,
);
