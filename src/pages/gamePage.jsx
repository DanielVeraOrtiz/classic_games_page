import './gamePage.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import Tag from '../components/tags/tags';
import GameInformation from '../components/gameInformation/gameInformation';
import OtherGames from '../components/otherGames/otherGames';

//Iconos
import { IoIosResize } from "react-icons/io";

export default function GamePage() {
  const {id} = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const gameRef = useRef(null);
  const otherRef = useRef(null);

  const handleFullScreenButton = useCallback(() => {
    setIsFullScreen(prev => !prev);
  }, [])

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get(`https://gamemonetize.com/feed.php?format=0&id=${id}`);
        setGame(response.data[0]);
        console.log('Obtencion del juego sin problemas');
      } catch (error) {
        console.error('Sucedió un error: ' + error);
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
  } else {
    return (
      <div className={`container ${isFullScreen ? 'full' : ''}`} role="main">
        <div className='game-container' ref={gameRef}>
          <div className='game-heading'>
            <img className='game-img' src={game.thumb} alt={`Miniatura del juego ${game.title}`} />
            <h1 className='game-title'>{game.title}</h1>
            <button className='resize' aria-label='resize-button' onClick={handleFullScreenButton}>
              <IoIosResize aria-hidden='true' focusable='false' />
            </button>
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
