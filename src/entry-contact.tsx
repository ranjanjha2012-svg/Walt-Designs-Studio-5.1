import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Contact from './pages/Contact';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Contact />
  </StrictMode>,
);
