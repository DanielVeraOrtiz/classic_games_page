import { MdMenuOpen } from 'react-icons/md';
import React, { useCallback, useContext } from 'react';
import { OpenSidebarContext } from '../../Layout';

function ButtonOpen() {
  console.log('The Open button is rendered again');
  const { isOpen, setIsOpen } = useContext(OpenSidebarContext);

  // Cambia si cambian las dependencias, en este caso solo se monta y no cambia nunca la direccion a la memoria
  // de la primera funcion, evitando reconstruirla en cada re render
  const toggleSidebar = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, [setIsOpen]);

  return (
    <button
      className="navbar-toggle"
      onClick={toggleSidebar}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
      aria-expanded={isOpen}
      aria-controls="sidebar-menu"
    >
      <MdMenuOpen aria-hidden="true" focusable="false" />
    </button>
  );
}

// No funciona debido a que esta el context, entonces a pesar de que no cambien props, esto renderiza
// nuevamente el componente.
export default React.memo(ButtonOpen);
