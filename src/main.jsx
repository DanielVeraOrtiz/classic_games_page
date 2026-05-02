import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import AuthProvider from './auth/authContext.jsx';
import { GamesProvider } from './context/GamesContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <GamesProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </GamesProvider>
    </AuthProvider>
  </StrictMode>,
);
