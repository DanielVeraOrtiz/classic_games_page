import './otherGames.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function OtherGames() {
    const [otherGames, setOtherGames] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOtherGames = async () => {
            try {
                const response = await axios.get('https://gamemonetize.com/feed.php?format=0&num=500&page=1');
                const muestra = response.data.sort(() => Math.random() - 0.5).slice(0, 20);
                setOtherGames(muestra);
            } catch (error) {
                console.error('Ha sucedido un problema' + error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchOtherGames();
    }, [])

    if (isLoading) {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <div className='other-games-container' aria-label='Otros juegos'>
            {otherGames.map((game, index) => {
                return (
                    <Link to={`/game/${game.id}`}>
                        <div className='other-game-container' key={index}>
                            <img className='other-game-img' src={game.thumb} alt={game.title} />
                            <div className='other-game-information'>
                                <h4>{game.title}</h4>
                                <p>{game.description}</p>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );

}

export default React.memo(OtherGames);
