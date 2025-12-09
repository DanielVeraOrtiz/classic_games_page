import './gamePage.css'
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Tag from '../components/tags/tags';
import GameInformation from '../components/gameInformation/gameInformation';
import OtherGames from '../components/otherGames/otherGames';

export default function GamePage() {
  const {id} = useParams();
  const [game, setGame] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <h1>Cargando</h1>
    );
  } else {
    return (
      <div className='container'>
        <div className='game-container'>
          <div className='game-heading'>
            <img className='game-img' src={game.thumb} alt={game.title} aria-hidden='true' focusable='false' />
            <h1 className='game-title'>{game.title}</h1>
          </div>
          <iframe className='game' src={game.url}></iframe>
          <div className='game-information'>
            <div className='tags-container'>
              {game.tags.split(',').map((tag, index) => 
                <Tag key={index} tag={tag} />
              )}
            </div>
            <GameInformation description={game.description} instructions={game.instructions} />
          </div>
        </div>
        <div className='other-games'>
          <OtherGames />
        </div>
      </div>
    );
  }
}