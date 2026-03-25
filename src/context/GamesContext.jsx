import { createContext, useEffect, useState } from 'react';
import FALLBACK_GAMES from './gamesDataFallback.json';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);
  const gamemonetizeUrl = import.meta.env.VITE_GAMEMONETIZE_URL;

  useEffect(() => {
    const getGames = async () => {
      try {
        // Antes estaba el axios apuntando a la API de Gamemonetize
        setGames(FALLBACK_GAMES);
      } catch (error) {
        console.error('Error: ', error);
        console.warn('Using fallback data');
        setGames(FALLBACK_GAMES);
      } finally {
        setIsLoadingGames(false);
      }
    };

    getGames();
  }, [gamemonetizeUrl]);

  return (
    <GamesContext.Provider value={{ games, isLoadingGames }}>{children}</GamesContext.Provider>
  );
};
