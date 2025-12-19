import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from './pages/landingPage';
import GamePage from './pages/gamePage';
import SignUpLoginPage from './pages/signUpLoginPage';
import ModalLoginSignUp from './components/modalLoginSignUp/modalLoginSignUp';

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path='game/:id' element={<GamePage />} />
                    <Route path='login-register' element={<ModalLoginSignUp/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
