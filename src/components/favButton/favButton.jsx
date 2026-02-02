import './favButton.css';
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

// Icons
import { MdFavorite } from 'react-icons/md';
import { MdFavoriteBorder } from 'react-icons/md';

function FavButton({ favorite, id, imgUrl, category, title }) {
  const [isFavorite, setIsFavorite] = useState(favorite);
  const { token, userId } = useContext(AuthContext);

  const handleFavButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const postFavorite = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/favorites',
          {
            user_id: userId,
            game_id: id,
            imgUrl: imgUrl,
            category: category,
            title: title,
          },
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          },
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFavorite((prev) => !prev);
      }
    };

    postFavorite();
  };

  const handleFavDeleteButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const deleteFavorite = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/favorites/${id}`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFavorite((prev) => !prev);
      }
    };

    deleteFavorite();
  };

  return (
    <>
      {!isFavorite ? (
        <button
          className="btn-fav"
          onClick={handleFavButton}
          aria-label="Button for checked game as favorite"
          title="Agregar a favoritos"
        >
          <MdFavoriteBorder />
        </button>
      ) : (
        <button
          className="btn-fav checked"
          onClick={handleFavDeleteButton}
          aria-label="Button for unchecked game from favorites"
          title="Eliminar de favoritos"
        >
          <MdFavorite />
        </button>
      )}
    </>
  );
}

export default FavButton;
