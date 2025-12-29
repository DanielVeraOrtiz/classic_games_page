import './modalLoginSignUp.css';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

//Icons
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUserCircle } from "react-icons/fa";

function ModalLoginSignUp() {
    const { setToken } = useContext(AuthContext);
    const [isVisible, setIsVisible] = useState(false);
    const modalRef = useRef(null);
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        password: '',
    });
    const [switchFormSignup, setSwitchFormSignup] = useState(false);
    const [hiddenSignup, setHiddenSignup] = useState(true);
    const [hiddenLogin, setHiddenLogin] = useState(false);
    const [errorMessageLogin, setErrorMessageLogin] = useState('');
    const [errorMessageSignup, setErrorMessageSignup] = useState('');

    const handleModalOpen = () => {
        const modal = modalRef.current;
        modal.showModal();
        setIsVisible(true);
    }

    const handleModalClose = (e) => {
        if (e.target === e.currentTarget) {
            modalRef.current.close();
        }
    }

    const handleSignupFormChange = (e) => {
        const {name, value} = e.target;
        setSignupForm(prev => (
            {...prev, [name]: value}
        ));
        console.log(signupForm);
    }

    const handleLoginFormChange = (e) => {
        const {name, value} = e.target;
        setLoginForm(prev => (
            {...prev, [name]: value}
        ));
        console.log(loginForm);
    }

    const handleSubmitSignupForm = (e) => {
        e.preventDefault();
        const postSignup = async () => {
            try {
                const response = await axios.post('http://localhost:3000/signup', signupForm);
                console.log(response);
                setToken(response.data.access_token);
                modalRef.current.close();
            } catch (err) {
                console.error('Error: ', err);
                setErrorMessageSignup(err.response?.data ? err.response.data : err.message);
            }
        }

        postSignup();
    }

    const handleSubmitLoginForm = (e) => {
        e.preventDefault();
        const postLogin = async () => {
            try {
                const response = await axios.post('http://localhost:3000/login', loginForm);
                console.log(response);
                setToken(response.data.access_token);
                modalRef.current.close();
            } catch (err) {
                console.error('Error: ', err);
                setErrorMessageLogin(err.response?.data ? err.response.data : err.message);
            }
        }

        postLogin();
    }

    const handleSwitchForm = () => {
        setSwitchFormSignup(prev => !prev);
        if (hiddenLogin && !hiddenSignup) {
            setHiddenLogin(false);
            setTimeout(() => setHiddenSignup(true), 500);
        } else if (!hiddenLogin && hiddenSignup) {
            setHiddenSignup(false);
            setTimeout(() => setHiddenLogin(true), 500);
        }
    }

    return (
        <>
            <div className='container-user' aria-label="Panel de usuario" title='Panel de usuario' tabIndex="0" onClick={handleModalOpen}
            aria-controls='login-modal' >
                <div className='icon-container'>
                    <FaRegUserCircle aria-hidden="true" focusable="false"/>
                </div>
                <p className='username'>Iniciar sesión</p>
            </div>
            <dialog id='login-modal' ref={modalRef} className='login-modal' aria-hidden={!isVisible} 
            aria-expanded={isVisible} onClick={handleModalClose} >
                <div className={`overlay-forms ${switchFormSignup ? 'switch' : ''}`}>
                    <h2>Nos alegra tenerte de vuelta</h2>
                    <p>Te estabamos esperando con miles de juegos</p>
                    <p>{switchFormSignup ? 'Necesitas iniciar sesion?' : 'Necesitas crearte una cuenta?'}</p>
                    <button className='btn-switch-forms' onClick={handleSwitchForm}>
                        {switchFormSignup ? 'Ir a iniciar sesion' : 'Ir a crear cuenta'}
                    </button>
                </div>
                <div className='forms-container'>
                    <div className='signup-container' aria-hidden={hiddenSignup ? 'true' : 'false'}>
                        <div aria-hidden={hiddenSignup ? 'true' : 'false'} hidden={hiddenSignup ? 'true' : ''}>
                            <h2>Crear cuenta</h2>
                            <form className='signup-form' onSubmit={handleSubmitSignupForm}>
                                <label htmlFor='username-signup'><FaUser />Username</label>
                                <input 
                                    id='username-signup'
                                    type='text' name='username'
                                    value={signupForm.username}
                                    onChange={handleSignupFormChange}
                                    required
                                />
                                <label htmlFor='email-signup'><MdEmail />Email</label>
                                <input
                                    id='email-signup'
                                    type='email' name='email'
                                    value={signupForm.email}
                                    onChange={handleSignupFormChange}
                                    required
                                />
                                <label htmlFor='password-signup'><RiLockPasswordFill />Password</label>
                                <input
                                    id='password-signup'
                                    type='password'
                                    name='password'
                                    value={signupForm.password}
                                    onChange={handleSignupFormChange}
                                    required
                                />
                                <button className='submit-signup-form' type='submit'>Crear cuenta</button>
                                <p className='error-message'>{errorMessageSignup}</p>
                            </form>
                        </div>
                    </div>
                    <div className='login-container' aria-hidden={hiddenLogin ? 'true' : 'false'}>
                        <div aria-hidden={hiddenLogin ? 'true' : 'false'} hidden={hiddenLogin ? 'true' : ''}>
                            <h2>Iniciar sesión</h2>
                            <form className='login-form' onSubmit={handleSubmitLoginForm}>
                                <label htmlFor='email-login'><MdEmail />Email</label>
                                <input
                                    id='email-login'
                                    type='email'
                                    name='email'
                                    value={loginForm.email}
                                    onChange={handleLoginFormChange}
                                    required
                                />
                                <label htmlFor='password-login'><RiLockPasswordFill />Password</label>
                                <input
                                    id='password-login'
                                    type='password'
                                    name='password'
                                    value={loginForm.password}
                                    onChange={handleLoginFormChange}
                                    required
                                />
                                <button className='submit-login-form' type='submit'>Iniciar sesión</button>
                                <p className='error-message'>{errorMessageLogin}</p>
                            </form>
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default React.memo(ModalLoginSignUp);
