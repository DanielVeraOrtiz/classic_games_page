import './gamePage.css'
import { useParams } from 'react-router-dom';
import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import axios from 'axios';
import Tag from '../components/tags/tags';
import GameInformation from '../components/gameInformation/gameInformation';
import OtherGames from '../components/otherGames/otherGames';
import { OpenSidebarContext } from '../Layout';
import { AuthContext } from '../auth/authContext';
import FavButton from '../components/favButton/favButton';

//Iconos
import { IoIosResize } from "react-icons/io";

// Aqui esta lo raro, donde GPT me confundio. Al parecer los rerenders de layout deberian hacer rerender de esto
// lo cual pasaria cada vez que cambia isOpen. Sin embargo no pasa, aunque vimos el ejemplo del logo que hace re render,
// pasando por la navbar antes, por lo que se puede hacer una jerarquia de re renders. Sin embargo aqui no pasa.
// Estimo que es por que no es un componente puesto directo en el return de layout, sino a traves de oulet que se cambia
// en el router, que hace que el re render de layout no afecte a lo que cambie en outlet.
function GamePage() {
  console.log('GamePage se renderiza nuevamente');
  const { setIsOpen } = useContext(OpenSidebarContext);
  const { token, isAuthenticated } = useContext(AuthContext);
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const gameRef = useRef(null);
  const otherRef = useRef(null);
  const [isFavorite, setIsFavorite] = useState(null);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    setIsOpen(false);
  }, [setIsOpen]); // Con solo [] deberia funcionar por que se ejecuta una vez al montar

  const handleFullScreenButton = useCallback(() => {
    setIsFullScreen(prev => !prev);
  }, []);

  useEffect(() => {
    const isFavoriteGame = async () => {
      try {
        const responseFavorite = await axios.get(`http://localhost:3000/favorites/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(responseFavorite);
        setIsFavorite(true);
      } catch (error) {
        console.error(error);
        setIsFavorite(false);
      }
    }

    isFavoriteGame();
  }, [id])
  
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://gamemonetize.com/feed.php?format=0&id=${id}`);
        setGame(response.data[0]);
        console.log('Obtencion del juego sin problemas');
      } catch (error) {
        console.error('Sucedió un error: ' + error);
        setMessageError('El servidor de GameMonetize no esta funcionando vuelva en otro momento');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGameData();
  }, [id]);

  useEffect(() => {
    const gameEl = gameRef.current;
    const otherEl = otherRef.current;
    if (!gameEl || !otherEl) return;

    // función para ajustar altura
    const sync = () => {
      const h = gameEl.offsetHeight;
      otherEl.style.maxHeight = `${h}px`;
    };

    // inicial
    sync();

    // observar cambios en tamaño del game-container
    let ro;
    if (window.ResizeObserver) {
      ro = new ResizeObserver(sync);
      ro.observe(gameEl);
      // opcional: observar también cambios en contenido de other para forzar sync
      ro.observe(otherEl);
    } else {
      // fallback: recalcula en resize de ventana
      window.addEventListener("resize", sync);
    }

    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", sync);
    };
  },[isLoading])

  if (isLoading) {
    return (
      <h1>Cargando</h1>
    );
  } else if (!isLoading && messageError) {
    return (
      <h1 className='error-message'>{messageError}</h1>
    );
  } else {
    return (
      <div className={`container ${isFullScreen ? 'full' : ''}`} role="main">
        <div className='game-container' ref={gameRef}>
          <div className='game-heading'>
            <img className='game-img' src={game.thumb} alt={`Miniatura del juego ${game.title}`} />
            <h1 className='game-title'>{game.title}</h1>
            <div className='resize-fav-container'>
              { isAuthenticated &&
                <FavButton favorite={isFavorite} id={id} imgUrl={game.thumb} category={game.category} title={game.title} />
              }
              <button className='resize' aria-label='resize-button' onClick={handleFullScreenButton}>
                <IoIosResize aria-hidden='true' focusable='false' />
              </button>
            </div>
          </div>
          <iframe className='game' src={game.url} title={`Juego: ${game.title}`}></iframe>
          <div className='game-information'>
            <div className='tags-container' role="list">
              {game.tags.split(',').map((tag, index) => 
                <Tag key={index} tag={tag} role='listitem' />
              )}
            </div>
            <GameInformation description={game.description} instructions={game.instructions} />
          </div>
        </div>
        <div className='other-games' aria-label='Juegos relacionados' ref={otherRef}>
          <OtherGames />
        </div>
      </div>
    );
  }
}

// No funciona porque uso el useContext y este React.memo no tiene nada que ver con que los demas funcionen.
export default React.memo(GamePage);
