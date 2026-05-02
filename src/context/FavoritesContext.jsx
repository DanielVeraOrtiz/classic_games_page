import { createContext, useEffect, useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import axios from 'axios';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [favoritesSet, setFavoritesSet] = useState(new Set());
  const { token, isAuthenticated, isLoading } = useContext(AuthContext);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(true);
  const [messageError, setMessageError] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (favorites.length > 0) {
      setMessageError('');
    }
  }, [favorites.length]);

  useEffect(() => {
    const fetchGameData = async () => {
      if (isAuthenticated && !isLoading) {
        try {
          const responseFavorites = await axios.get(`${backendUrl}/favorites/me`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log('HOLAAA', responseFavorites.data);
          setFavorites(responseFavorites.data);
          setFavoritesSet(
            new Set(responseFavorites.data.map((favorite) => String(favorite.game_id))),
          );
        } catch (error) {
          console.error(`The following error was obtained: ${error}`);
          setMessageError('Add your first favorite game');
        } finally {
          setIsLoadingFavorites(false);
        }
      } else if (!isAuthenticated && !isLoading) {
        setIsLoadingFavorites(false);
      }
    };
    fetchGameData();
  }, [isAuthenticated, backendUrl, token]);

  return (
    <FavoritesContext.Provider
      value={{ favorites, setFavorites, isLoadingFavorites, messageError, favoritesSet }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
