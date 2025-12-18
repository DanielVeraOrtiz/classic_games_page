import './landingPage.css'
import games from './gamesData'
import Card from '../components/card/card';
import axios from 'axios';
import { useState, useEffect } from 'react';

// Aqui esta lo raro, donde GPT me confundio. Al parecer los rerenders de layout deberian hacer rerender de esto
// lo cual pasaria cada vez que cambia isOpen. Sin embargo no pasa, aunque vimos el ejemplo del logo que hace re render,
// pasando por la navbar antes, por lo que se puede hacer una jerarquia de re renders. Sin embargo aqui no pasa.
// Estimo que es por que no es un componente puesto directo en el return de layout, sino a traves de oulet que se cambia
// en el router, que hace que el re render de layout no afecte a lo que cambie en outlet.
export default function LandingPage() {
  console.log('La landing page se renderiza nuevamente');
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
