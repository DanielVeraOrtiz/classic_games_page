import './otherGames.css';
import React from 'react';
import { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

export default function OtherGames() {
    const { id } = useParams();
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
    }, [id])

    if (isLoading) {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <div className='other-games-container' aria-label='Otros juegos' role='list' >
            <h2>Otros juegos</h2>
            {otherGames.map((game, index) => {
                return (
                    <Link to={`/game/${game.id}`} key={index} role='listitem'>
                        <div className='other-game-container'>
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
