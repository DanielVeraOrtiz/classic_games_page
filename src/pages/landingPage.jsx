import './landingPage.css'
import games from './gamesData'
import Card from '../components/card/card';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import Spinner from '../components/spinner/spinner';

const categories = [
  "All",
  "Puzzle",
  "Arcade",
  "Action",
  "Adventure",
  "Hypercasual",
  "Racing",
  "Clicker",
  "Shooting",
  "Multiplayer",
  "Sports",
  "Girls",
  "Stickman",
  "Boys",
  "3D",
  "Soccer",
  "Cooking",
  ".IO",
  "Baby Hazel"
];


// Aqui esta lo raro, donde GPT me confundio. Al parecer los rerenders de layout deberian hacer rerender de esto
// lo cual pasaria cada vez que cambia isOpen. Sin embargo no pasa, aunque vimos el ejemplo del logo que hace re render,
// pasando por la navbar antes, por lo que se puede hacer una jerarquia de re renders. Sin embargo aqui no pasa.
// Estimo que es por que no es un componente puesto directo en el return de layout, sino a traves de oulet que se cambia
// en el router, que hace que el re render de layout no afecte a lo que cambie en outlet.
export default function LandingPage() {
  console.log('The landing page is rendered again');
  const [gameData, setGameData] = useState([]);
  const [games, setGames] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const { token, isAuthenticated } = useContext(AuthContext);
  const [ messageError, setMessageError ] = useState('');
  const [ isLoading, setIsLoading ] = useState(true);

  // Es mejor controlar las requests en useEffect distintos para controlar mejor los errores
  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (isAuthenticated) {
          const responseFavorites = await axios.get('http://localhost:3000/favorites/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setFavorites(new Set(responseFavorites.data.map((favorite) => `${favorite.game_id}`)));
        }
        const response = await axios.get('https://gamemonetize.com/feed.php?format=0&num=50&page=1');
        setGameData(response.data);
        setGames(response.data)
        console.log('The acquisition of games was successful');
      } catch (error) {
        console.error(`The following error was obtained ${error}`);
        setMessageError('The GameMonetize server is down, please try again later');
      } finally {
        setIsLoading(false);
      }
    }
    fetchGameData();
  }, [isAuthenticated])

  const handleFilterButton = (e) => {
    const {value} = e.target;
    if (value === 'All') {
      setGames(gameData);
      return;
    }
    setGames(gameData.filter(game => game.category === value));
  }
  if (isLoading) {
    return (
      <div className='landing-page-spinner-container'>
        <Spinner size='50px' />
      </div>
    );
  } else if (!isLoading && messageError) {
    return (
      <h1 className='error-message'>{messageError}</h1>
    );
  } else {
    return (
      <>
        <div className='filter-buttons-container'>
          {categories.map(category => (
            <button className='filter-games-button' value={category} onClick={handleFilterButton}>{category}</button>
          ))}
        </div>
        <section className='games-grid'>
          {games.map((game, index) => {
            return (
            <Card
              key={game.id}
              id={game.id}
              title={game.title}
              content={game.description}
              imgSrc={game.thumb}
              imgAlt={game.title}
              category={game.category}
              favorite={isAuthenticated ? favorites.has(game.id) : false}
            />
          )})}
        </section>
      </>
    );
  }
}
