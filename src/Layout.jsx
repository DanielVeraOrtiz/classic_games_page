import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { useMediaQuery } from './hooks/useBreakpoint';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import './Layout.css';

export default function Layout() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isOpen, setIsOpen] = useState(isDesktop);

  useEffect(() => {
    setIsOpen(isDesktop);
  }, [isDesktop]);

  const toggleSidebar = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  return (
      <>
        <Navbar isOpen={isOpen} setIsOpen={toggleSidebar} />
        <div className='layout'>
          <Sidebar isOpen={isOpen} setIsOpen={toggleSidebar} />
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
      </>
  );
}
