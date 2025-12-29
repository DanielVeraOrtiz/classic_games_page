import './sidebar.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import React, { useState, useContext, useEffect } from "react";
import ButtonOpen from '../buttonOpen/buttonOpen';
import { AuthContext } from '../../auth/authContext';
import axios from 'axios';
import Spinner from '../spinner/spinner';
// Iconos
import IconYoutube from '../../iconComponents/iconYoutube';
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";

function Sidebar({isOpen}) {
  console.log('The sidebar is rendered again');
  const [favorites, setFavorites] = useState([]);
  const { token, isAuthenticated } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [messageError, setMessageError] = useState('');

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        if (isAuthenticated) {
          const responseFavorites = await axios.get('http://localhost:3000/favorites/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log(responseFavorites.data);
          setFavorites(responseFavorites.data);
        }
      } catch (error) {
        console.error(`The following error was obtained: ${error}`);
        setMessageError('The page server is down, please try again later');
      } finally {
        setIsLoading(false);
      }
    }
    fetchGameData();
  }, [isAuthenticated])

  const owner_path = [
    { to: "/profile", label: "Go to my profile", icon: FaRegUserCircle },
    { to: "/settings", label: "Open settings", icon: MdOutlineSettings },
  ];

  return (
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} id='sidebar-menu' role='navigation' 
      aria-label='Side navigation bar between games' aria-hidden={!isOpen} aria-expanded={isOpen}>
        <div className='sidebar-logo'>
          <ButtonOpen />
          <Link to='/' className='logo-svg' aria-label='Back to Home' title='Back to Home' focusable="false">
            <IconYoutube />
          </Link>
        </div>
        <hr className='separator'></hr>
        <p className='sidebar-title'>Favorites games</p>
        <ul className='sidebar-links'>
          { isAuthenticated ? (!isLoading ? (
            !messageError ? (
            favorites.map((juego) => (
            <li key={juego.game_id}>
              <Link to={`/game/${juego.game_id}`}>
                <img className='sidebar-game-img' src={juego.game.imgUrl} />
                <p className='sidebar-game-title-favorite'>{juego.game.title}</p>
              </Link>
            </li>
            ))) : (
              <p className='error-message'>{messageError}</p>
            )
          ) : (
            <div className='sidebar-spinner-container'>
              <Spinner size='30px' />
            </div>
          )) : (
            <li className='sidebar-message-login'>You must be logged in to add games to favorites</li>
          )}
        </ul>
        { isAuthenticated && (
          <>
            <hr className='separator'></hr>
            <p className='sidebar-title'>You</p>
            <ul className='sidebar-links'>
              {owner_path.map((path) => {
                const Icon = path.icon;
                return (
                <li key={path.to}>
                  <Link to={path.to}><Icon className='icons-sidebar' />{path.label}</Link>
                </li>
              )})}
            </ul>
          </>
        )}

      </aside>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

// No funciona, por que isOpen cambia constantemente, y es usado por un componente y para agregar una clase
// asi que no hay forma de que no se renderize nuevamente.
export default React.memo(Sidebar);
