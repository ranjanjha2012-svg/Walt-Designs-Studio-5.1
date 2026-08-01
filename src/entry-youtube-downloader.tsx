import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import YouTubeDownloaderPage from './pages/YouTubeDownloaderPage';
import './index.css';
import { register } from './registerServiceWorker';

register();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <YouTubeDownloaderPage />
  </StrictMode>,
);
