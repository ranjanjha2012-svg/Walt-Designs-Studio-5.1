import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import About from './pages/About';
import './index.css';
import { register } from './registerServiceWorker';

register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <About />
  </StrictMode>,
);
