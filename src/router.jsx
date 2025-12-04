import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from './hooks/useBreakpoint';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import LandingPage from './pages/landingPage';

function Layout() {
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
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
}

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<LandingPage />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
