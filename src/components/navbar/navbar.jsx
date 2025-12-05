import './navbar.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import React from "react";
// Iconos
import { MdMenuOpen } from "react-icons/md";
import { CiSearch } from "react-icons/ci";
import { FaRegUserCircle } from "react-icons/fa";
import IconYoutube from '../../iconComponents/iconYoutube';

// El React.memo no funciona, por que isOpen cambia cada vez que se abre o cierra el sidebar,
// pero si se saca eso el console log se muestra una sola vez al renderizar el componente, por lo 
// cual deja de renderizarse innecesariamente.

// Ojo que de usar Context, puedo separar el boton en otro componente y hacer que solo ese se renderice
// al cambiar el estado de isOpen solo en el.
function Navbar({isOpen, setIsOpen}) {
  return (
    <header className={`header`}>
      <nav className='navbar' aria-label="Barra de navegación principal">
        <div className='navbar-logo'>
          <button 
            className='navbar-toggle'
            onClick={setIsOpen}
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

export default React.memo(Navbar);
