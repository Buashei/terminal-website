import React from 'react';
import ReactDOM from 'react-dom/client';
import { Main } from './components';

import './index.css';
import './normalize.css';
// import 'node_modules/css-reset-and-normalize/css/reset-and-normalize.min.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
