// context/GamesContext.jsx
import { createContext, useEffect, useState } from 'react';
import { getGames } from '../services/gamesService';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    getGames().then(setGames);
  }, []);

  return <GamesContext.Provider value={{ games }}>{children}</GamesContext.Provider>;
};
