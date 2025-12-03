import { useState } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/navbar/navbar';
import Sidebar from './components/sidebar/sidebar';

function Layout() {
    const [isOpen, setIsOpen] = useState(window.innerWidth >= 768 ? true : false);
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
                </Route>
            </Routes>
        </BrowserRouter>
    );
}