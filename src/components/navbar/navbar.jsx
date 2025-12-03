import './navbar.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// Iconos
import { MdMenuOpen } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import IconYoutube from '../../iconComponents/iconYoutube';

export default function Navbar({isOpen, setIsOpen}) {
  return (
    <header className={`header`}>
      <nav className='navbar' aria-label="Barra de navegación principal">
        <div className='navbar-logo'>
          <button 
            className='navbar-toggle'
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
            aria-controls="sidebar-menu"
          >
            <MdMenuOpen aria-hidden="true" focusable="false"/>
          </button>
          <Link to='/' className='logo-svg' aria-label='Inicio' title='Inicio' focusable="false">
            <IconYoutube />
          </Link>
        </div>
        <div className='search-bar'>
          <label htmlFor="search-input" className="visually-hidden">Buscar</label>
          <input id="search-input" className='search-input' type='text' placeholder='Buscar' />
          <button className='search-button' aria-label='Buscar' title='Buscar'>
            <CiSearch aria-hidden="true" focusable="false"/>
          </button>
        </div>
        <div className='navbar-user'>
          <div className='container-user' aria-label="Panel de usuario" title='Panel de usuario' tabIndex="0">
            <div className='icon-container'>
              <FaRegUserCircle aria-hidden="true" focusable="false"/>
            </div>
            <p className='username'>Pyng Lesther Marcian</p>
          </div>
        </div>
      </nav>
    </header>
  )
}

Navbar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}
