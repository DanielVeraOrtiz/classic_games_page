import './otherGames.css';
import React from 'react';
import { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GamesContext } from '../../context/GamesContext';

function OtherGames() {
  console.log('OtherGames is being rendered again');
  const { id } = useParams();
  const [otherGames, setOtherGames] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [messageError, setMessageError] = useState('');
  const { games } = useContext(GamesContext);

  useEffect(() => {
    const fetchOtherGames = async () => {
      if (games.length) {
        try {
          const muestra = games.sort(() => Math.random() - 0.5).slice(0, 20);
          setOtherGames(muestra);
        } catch (error) {
          console.error('A problem has occurred: ' + error);
          setMessageError('The GameMonetize server is down, please try again later');
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchOtherGames();
  }, [id, games]);

  if (isLoading) {
    return <p>Cargando...</p>;
  } else if (!isLoading && messageError) {
    return <p className="error-message">{messageError}</p>;
  }

  return (
    <div className="other-games-container" aria-label="Other games" role="list">
      <h2>Others games</h2>
      {otherGames.map((game, index) => {
        return (
          <Link to={`/game/${game.id}`} key={index} role="listitem">
            <div className="other-game-container">
              <img className="other-game-img" src={game.thumb} alt={game.title} />
              <div className="other-game-information">
                <h4>{game.title}</h4>
                <p>{game.category} Game</p>
                <p>{game.description}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

// Para evitar que el re render de GamePage haga rerender en esto tambien.
export default React.memo(OtherGames);
