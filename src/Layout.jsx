import { useState, useEffect, useCallback, createContext } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from './hooks/useBreakpoint';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import './Layout.css';

export const OpenSidebarContext = createContext(null);

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(isDesktop);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Puede ser que para que esto re renderice GamePage y LandingPage hace falta que tenga relacion directa
  // no a traves de outlet y router.
  return (
      <OpenSidebarContext.Provider value={{isOpen, setIsOpen, isDesktop}}>
        {/* <Navbar isOpen={isOpen} setIsOpen={toggleSidebar} /> */}
        {/* Cambie a Context y pase directo al boton para probar si react.memo no renderiza la navbar
        cada vez que se apreta el boton */}
        <Navbar />
        <div className='layout'>
          <Sidebar isOpen={isOpen} />
          {isOpen && (
            <div 
                className='overlay' 
                aria-hidden="true" 
                focusable='false' 
                onClick={toggleSidebar}
            />
          )}
          <main className={`layout-content ${!isOpen ? 'sidebar-closed' : ''}`}>
            <Outlet />
          </main>
        </div>
      </OpenSidebarContext.Provider>
  );
}
