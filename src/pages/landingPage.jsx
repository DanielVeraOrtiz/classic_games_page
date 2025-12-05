import './landingPage.css'
import games from './gamesData'
import Card from '../components/card/card';

export default function LandingPage() {
  return (
    <section className='games-grid'>
      {games.map((game, index) => (
        <Card
          key={index}
          title={game.title}
          content={game.content}
          imgSrc={game.imgSrc}
          imgAlt={game.imgAlt}
        />
      ))}
    </section>
  );
}
