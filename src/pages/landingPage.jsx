import './landingPage.css'
import games from './gamesData'
import Card from '../components/card/card';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const [gameData, setGameData] = useState([]);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get('https://gamemonetize.com/feed.php?format=0&num=50&page=1');
        setGameData(response.data);
        console.log(response.data);
        console.log('La obtencion de juegos fue exitosa');
      } catch (error) {
        console.error(`Se obtuvo el siguiente error ${error}`);
      }
    }
    fetchGameData();
  }, [])
  return (
    <section className='games-grid'>
      {gameData.map((game, index) => (
        <Card
          key={game.id}
          id={game.id}
          title={game.title}
          content={game.description}
          imgSrc={game.thumb}
          imgAlt={game.title}
        />
      ))}
    </section>
  );
}
