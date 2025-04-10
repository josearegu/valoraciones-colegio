import React from 'react';
import ReactDOM from 'react-dom/client'; // Usamos createRoot en React 18
import App from './App.jsx'; // Asegúrate de que la extensión sea .jsx

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
