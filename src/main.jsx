// Entry point for React application
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app.js';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
