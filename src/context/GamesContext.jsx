import { createContext, useEffect, useState } from 'react';
import FALLBACK_GAMES from './gamesDataFallback.json';
import FALLBACK_GAMES_TEST from './gamesDataTest.json';

export const GamesContext = createContext();

const isTest = import.meta.env.VITE_E2E === 'true';

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        // Antes estaba el axios apuntando a la API de Gamemonetize
        if (isTest) {
          setGames(FALLBACK_GAMES_TEST);
        } else {
          setGames(FALLBACK_GAMES);
        }
      } catch (error) {
        console.error('Error: ', error);
        console.warn('Using fallback data');
        setGames(FALLBACK_GAMES);
      } finally {
        setIsLoadingGames(false);
      }
    };

    getGames();
  }, []);

  return (
    <GamesContext.Provider value={{ games, isLoadingGames }}>{children}</GamesContext.Provider>
  );
};
