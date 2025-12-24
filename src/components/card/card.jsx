import './card.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

// Icons
import { MdFavorite } from "react-icons/md";
import { MdFavoriteBorder } from "react-icons/md";

export default function Card({ id, title, content, imgSrc, imgAlt, category, favorite}) {
  // console.log('La card se renderiza nuevamente');
  const [hoverColor, setHoverColor] = useState(`#${Math.floor(Math.random()*16777215).toString(16)}`);
  const {token, userId} = useContext(AuthContext);
  const [isFavorite, setIsFavorite] = useState(favorite);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0, g = 0, b = 0, count = 0;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        count++;
      }
      r = Math.floor(r / count);
      g = Math.floor(g / count);
      b = Math.floor(b / count);
      setHoverColor(`rgb(${r},${g},${b})`);
    };
  }, [imgSrc]);

  const handleFavButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const postFavorite = async () => {
      try {
        const response = await axios.post('http://localhost:3000/favorites', {
          user_id: userId,
          game_id: id
        } ,{
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFavorite(prev => !prev);
      }
    }

    postFavorite();
  }

    const handleFavDeleteButton = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const postFavorite = async () => {
      try {
        const response = await axios.delete(`http://localhost:3000/favorites/${id}`, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        setIsFavorite(prev => !prev);
      }
    }

    postFavorite();
  }

  // const handleMouseEnter = useCallback(() => {
  //   setIsHovered(true);
  // }, []);

  // const handleMouseLeave = useCallback(() => {
  //   setIsHovered(false);
  // }, []);

  return (
    <Link
      to={`/game/${id}`}
      className="card-link"
      // onMouseEnter={handleMouseEnter}
      // onMouseLeave={handleMouseLeave}
      // onFocus={() => setIsHovered(true)}
      // onBlur={() => setIsHovered(false)}
    >
      <article className="card">
        <img src={imgSrc} alt={imgAlt} className='card-image' />
        <div className="card-content">
          <div className='card-heading'>
            <h2 className="card-title">{title}</h2>
            {!isFavorite ? (
              <button className='btn-fav' onClick={handleFavButton} aria-label='Button for checked game as favorite'><MdFavoriteBorder /></button>
            ) : (
              <button className='btn-fav checked' onClick={handleFavDeleteButton} aria-label='Button for unchecked game from favorites'><MdFavorite /></button>
            )}
          </div>
          <p className="card-text category">{category} Game</p>
          <p className="card-text">{content}</p>
        </div>
        <div
          className='card-inner'
          style={{ "--hover-color": hoverColor }}
        ></div>
      </article>
    </Link>
  )
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
}
