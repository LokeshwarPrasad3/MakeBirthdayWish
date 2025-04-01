import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import BirthdayContextProvider from './context/birthday/BirthdayContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BirthdayContextProvider>
      <App />
    </BirthdayContextProvider>
  </StrictMode>
);
