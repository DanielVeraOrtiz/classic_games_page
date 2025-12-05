import './card.css';
import PropTypes from 'prop-types';
import React from "react";

export default function Card({ title, content, imgSrc, imgAlt}) {
  console.log('Hola mundo');
  return (
    <article className="card">
      <img src={imgSrc} alt={imgAlt} className='card-image' />
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-text">{content}</p>
      </div>
    </article>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  imgAlt: PropTypes.string.isRequired,
}
