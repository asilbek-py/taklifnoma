import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { I18nProvider } from './i18n/I18nProvider';
import { MusicProvider } from './music/MusicProvider';
import './styles.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <MusicProvider>
        <App />
      </MusicProvider>
    </I18nProvider>
  </StrictMode>,
);
