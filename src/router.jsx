import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';
import { useMediaQuery } from './hooks/useBreakpoint';

function Layout() {
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [isOpen, setIsOpen] = useState(isDesktop);

    useEffect(() => {
        setIsOpen(isDesktop);
    }, [isDesktop]);

    return (
        <>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className='layout'>
                <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
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
                    {/* Falta realicar los demas componentes pages */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
