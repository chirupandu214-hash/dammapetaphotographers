// client/src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // 'import { App }' అని కాకుండా 'import App' అని ఉండాలి

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
