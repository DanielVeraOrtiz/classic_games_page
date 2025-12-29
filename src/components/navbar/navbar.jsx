import './navbar.css';
import { Link, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import React, { useContext, useState, useEffect } from "react";
import ButtonOpen from '../buttonOpen/buttonOpen';
import { AuthContext } from '../../auth/authContext';
import Spinner from '../spinner/spinner';
import ModalLoginSignUp from '../modalLoginSignUp/modalLoginSignUp';
import axios from 'axios';
// Iconos
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import IconYoutube from '../../iconComponents/iconYoutube';
import { MdFavorite } from "react-icons/md";

// El React.memo no funciona, por que isOpen cambia cada vez que se abre o cierra el sidebar,
// pero si se saca eso el console log se muestra una sola vez al renderizar el componente, por lo 
// cual deja de renderizarse innecesariamente.

// Ojo que de usar Context, puedo separar el boton en otro componente y hacer que solo ese se renderice
// al cambiar el estado de isOpen solo en el.

// AL FINAL USE USECONTEXT PARA QUE NO SE RENDERIZARA MAS VECES. PARA PROBAR NO MAS.
function Navbar() {
  console.log('Navbar rendered again'); // No aparece mas veces que cuando se monta gracias a react.memo
  const { isAuthenticated, isLoading, logout, username } = useContext(AuthContext);
  const [gameData, setGameData] = useState([]);
  const navigate = useNavigate();

  const handleChangeSearchInput = (e) => {
    const selected = e.target.value;

    const game = gameData.find(g => g.title === selected);
    if (game) {
      navigate(`/game/${game.id}`);
    }
  };

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await axios.get('https://gamemonetize.com/feed.php?format=0&num=50&page=1');
        console.log('The acquisition of games was successful');
      } catch (error) {
        console.error(`The following error was obtained: ${error}`);
      }
    }
    fetchGameData();
  }, [])

  return (
    <header className={`header`}>
      <nav className='navbar' aria-label="Main navigation bar">
        <div className='navbar-logo'>
          <ButtonOpen /> {/* Solo este se renderiza de nuevo */}
          <Link to='/' className='logo-svg' aria-label='Back to Home' title='Back to Home' focusable="false">
            <IconYoutube />
          </Link>
        </div>
        <div className='search-bar'>
          <label htmlFor="search-input" className="visually-hidden">Search</label>
          <input id="search-input" className='search-input' type='text' placeholder='Search...' list='game-list' onChange={handleChangeSearchInput} />
          <datalist id='game-list'>
            {gameData.map(game => (
              <option key={game.id} value={game.title} />
            ))}
          </datalist>
          <button className='search-button' aria-label='Search button' title='Search button'>
            <CiSearch aria-hidden="true" focusable="false"/>
          </button>
        </div>
        <div className='navbar-user'>
          { !isLoading ? (isAuthenticated ? (
            <div className='container-user' aria-label="User panel" title='User panel' tabIndex="0">
              <div className='icon-container'>
                <FaRegUserCircle aria-hidden="true" focusable="false"/>
              </div>
              <p className='username'>{username}</p>
              <div className='dropdown-user-menu'>
                <Link to='/user/favoritesgames'><MdFavorite />Favorite games</Link>
                <button onClick={logout}>Log out</button>
              </div>
            </div>
          ) : (
            <ModalLoginSignUp />
          )) : (
            <div className='container-user'>
              <Spinner size='30px' />
            </div>
          )
          }
        </div>
      </nav>
    </header>
  )
}

Navbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}

// Si las props no cambian entonces la navbar usa el renderizado anterior. En este caso no tengo props.
// Si uso useContext en lugar de props, como react.memo solo revisa props (shallow comparison), entonces
// react.memo no evita que se re renderize si el valor del context cambia.

// Error: React.memo hace la diferencia, porque ButtonOpen usaContext y se rerenderiza haciendo que la misma
// navbar se rerenderice. Al usar react.memo evitamos el re render de la navbar y que solo pase en el boton.

// Confusion por ChatGPT, aunque no este el boton renderiza de nuevo la navbar, es el React.memo quien
// memoiza, nada de que cuando no cambian props no re renderiza, siempre lo hace para todo. A no ser
// que se memoize, el cual solo funciona si no cambian las props, pero si no cambian ese comportamiento
// no viene por defecto.

// Ojo como si re renderiza el icono de la pagina, sin react.memo lo hace, o sea react.memo ocupa el render
// anterior si no cambiaron los props, pero hace re render de sus hijos.

export default React.memo(Navbar);
