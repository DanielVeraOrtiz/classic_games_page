import './card.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import FavButton from '../favButton/favButton';
import { AuthContext } from '../../auth/authContext';

export default function Card({ id, title, content, imgSrc, imgAlt, category, favorite }) {
  console.log('The card is rendered again');
  const [hoverColor, setHoverColor] = useState(`gray`);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgSrc;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      let r = 0,
        g = 0,
        b = 0,
        count = 0;
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
        <img src={imgSrc} alt={imgAlt} className="card-image" />
        <div className="card-content">
          <div className="card-heading">
            <h2 className="card-title">{title}</h2>
            {isAuthenticated ? (
              <FavButton
                favorite={favorite}
                id={id}
                imgUrl={imgSrc}
                category={category}
                title={title}
              />
            ) : (
              <></>
            )}
          </div>
          <p className="card-text category">{category} Game</p>
          <p className="card-text">{content}</p>
        </div>
        <div className="card-inner" style={{ '--hover-color': hoverColor }}></div>
      </article>
    </Link>
  );
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
};
