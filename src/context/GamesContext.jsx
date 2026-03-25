import { createContext, useEffect, useState } from 'react';
import FALLBACK_GAMES from './gamesDataFallback.json';
import axios from 'axios';

export const GamesContext = createContext();

export const GamesProvider = ({ children }) => {
  const [games, setGames] = useState([]);
  const [isLoadingGames, setIsLoadingGames] = useState(true);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get(
          'https://gamemonetize.com/feed.php?format=0&num=200&page=1',
        );
        setGames(response.data);
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
