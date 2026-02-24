import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

import App from './App';

const container = document.getElementById('popup-root');

if (!container) {
  throw new Error('Could not find root container to mount the app');
}

const root = createRoot(container);
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
