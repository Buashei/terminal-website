import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';

import './index.css';
import 'node_modules/css-reset-and-normalize/css/reset-and-normalize.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
