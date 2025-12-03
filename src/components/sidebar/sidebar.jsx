import './sidebar.css';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
// Iconos
import { MdMenuOpen } from "react-icons/md";
import IconYoutube from '../../iconComponents/iconYoutube';

export default function Sidebar({isOpen, setIsOpen}) {
  const juegos = [
    { to: "/gato", label: "Gato" },
    { to: "/memoria-cartas", label: "Memoria cartas" },
    { to: "/precision", label: "Presición" },
  ];

  const owner_path = [
    { to: "/profile", label: "Perfil" },
    { to: "/settings", label: "Configuración" },
    { to: "/logout", label: "Cerrar sesión" },
  ];

  return (
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`} id='sidebar-menu' role='navigation' aria-label='Barra de navegacion lateral entre juegos'>
        <div className='sidebar-logo'>
          <button 
            className='sidebar-toggle'
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
        <hr className='separator'></hr>
        <p className='sidebar-title'>Juegos Disponibles</p>
        <ul className='sidebar-links'>
          {juegos.map((juego) => (
            <li key={juego.to}>
              <Link to={juego.to}>{juego.label}</Link>
            </li>
          ))}
        </ul>
        <hr className='separator'></hr>
        <p className='sidebar-title'>Tu</p>
        <ul className='sidebar-links'>
          {owner_path.map((path) => (
            <li key={path.to}>
              <Link to={path.to}>{path.label}</Link>
            </li>
          ))}
        </ul>
      </aside>
  )
}

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
}
