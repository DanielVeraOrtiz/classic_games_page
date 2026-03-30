import './landingPage.css';
import Card from '../components/card/card';
import { useState, useContext } from 'react';
import { AuthContext } from '../auth/authContext';
import Spinner from '../components/spinner/spinner';
import { GamesContext } from '../context/GamesContext';
import { FavoritesContext } from '../context/FavoritesContext';

const categories = [
  'All',
  'Puzzle',
  'Arcade',
  'Action',
  'Adventure',
  'Hypercasual',
  'Racing',
  'Clicker',
  'Shooting',
  'Sports',
  'Girls',
  'Stickman',
  'Boys',
  '3D',
  'Soccer',
];

// Aqui esta lo raro, donde GPT me confundio. Al parecer los rerenders de layout deberian hacer rerender de esto
// lo cual pasaria cada vez que cambia isOpen. Sin embargo no pasa, aunque vimos el ejemplo del logo que hace re render,
// pasando por la navbar antes, por lo que se puede hacer una jerarquia de re renders. Sin embargo aqui no pasa.
// Estimo que es por que no es un componente puesto directo en el return de layout, sino a traves de oulet que se cambia
// en el router, que hace que el re render de layout no afecte a lo que cambie en outlet.
export default function LandingPage() {
  console.log('The landing page is rendered again');
  const { games, isLoadingGames } = useContext(GamesContext);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { favoritesSet, isLoadingFavorites } = useContext(FavoritesContext);
  const { isAuthenticated } = useContext(AuthContext);
  // const [messageError, setMessageError] = useState('');

  // Es mejor controlar las requests en useEffect distintos para controlar mejor los errores

  const handleFilterButton = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredGames =
    selectedCategory === 'All' ? games : games.filter((game) => game.category === selectedCategory);

  if (isLoadingGames) {
    return (
      <div className="landing-page-spinner-container">
        <Spinner size="50px" />
      </div>
    );
  } else if (games.length === 0 && !isLoadingGames) {
    return <h1 className="error-message">No games found</h1>;
    // } else if (!isLoadingGames && !isLoadingFavorites && messageError) {
    //   return <h1 className="error-message">{'Hola'}</h1>;
  } else {
    return (
      <>
        <div className="filter-buttons-container">
          {categories.map((category, index) => (
            <button
              key={`${category}-${index}`}
              className="filter-games-button"
              value={category}
              onClick={handleFilterButton}
            >
              {category}
            </button>
          ))}
        </div>
        <section className="games-grid">
          {filteredGames.map((game, index) =>
            isLoadingFavorites ? (
              <div key={`${game.id}-${index}`} className="sidebar-spinner-container">
                <Spinner size="30px" />
              </div>
            ) : (
              <Card
                key={`${game.id}-${index}`}
                id={game.id}
                title={game.title}
                content={game.description}
                imgSrc={game.thumb}
                imgAlt={game.title}
                category={game.category}
                favorite={isAuthenticated ? favoritesSet.has(String(game.id)) : false}
              />
            ),
          )}
        </section>
      </>
    );
  }
}
