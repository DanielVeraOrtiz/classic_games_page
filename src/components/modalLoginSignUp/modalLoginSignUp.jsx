import './modalLoginSignUp.css';
import React, { useEffect, useState, useRef, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../auth/authContext';

function ModalLoginSignUp() {
    const { setToken } = useContext(AuthContext)
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
    })

    const handleModalOpen = () => {
        const modal = modalRef.current;
        modal.showModal();
    }

    const handleSignupFormChange = (e) => {
        const {name, value} = e.target;
        setSignupForm(prev => (
            {...prev, [name]: value}
        ))
        console.log(signupForm);
    }

    const handleLoginFormChange = (e) => {
        const {name, value} = e.target;
        setLoginForm(prev => (
            {...prev, [name]: value}
        ));
        console.log(loginForm);
    }

    const handleSubmitSignupForm = () => {
        const postSignup = async () => {
            try {
                const response = await axios.post('http://localhost:3000/signup', signupForm);
                console.log(response);
                setToken(response.data.access_token);
            } catch (err) {
                console.error('Error: ', err);
            }
        }

        postSignup();
    }

    const handleSubmitLoginForm = () => {
        const postLogin = async () => {
            try {
                const response = await axios.post('http://localhost:3000/login', loginForm);
                console.log(response);
                setToken(response.data.access_token);
            } catch (err) {
                console.error('Error: ', err);
            }
        }

        postLogin();
    }

    return (
        <>
            <button
                onClick={handleModalOpen}
                aria-controls='login-modal'
            >Abrir Modal</button>
            <dialog id='login-modal' ref={modalRef} className='login-modal'>
                <div className='forms-container'>
                    <div className='signup-container'>
                        <h2>Crear cuenta</h2>
                        <form method='dialog' className='signup-form' onSubmit={handleSubmitSignupForm}>
                            <label htmlFor='username-signup'>Username</label>
                            <input 
                                id='username-signup'
                                type='text' name='username'
                                value={signupForm.username}
                                onChange={handleSignupFormChange}
                                required
                            />
                            <label htmlFor='email-signup'>Email</label>
                            <input
                                id='email-signup'
                                type='email' name='email'
                                value={signupForm.email}
                                onChange={handleSignupFormChange}
                                required
                            />
                            <label htmlFor='password-signup'>Password</label>
                            <input
                                id='password-signup'
                                type='password'
                                name='password'
                                value={signupForm.password}
                                onChange={handleSignupFormChange}
                                required
                            />
                            <button className='submit-signup-form' type='submit'>Crear cuenta</button>
                        </form>
                    </div>
                    <div className='login-container'>
                        <h2>Iniciar sesión</h2>
                        <form method='dialog' className='login-form' onSubmit={handleSubmitLoginForm}>
                            <label htmlFor='email-login'>Email</label>
                            <input
                                id='email-login'
                                type='email'
                                name='email'
                                value={loginForm.email}
                                onChange={handleLoginFormChange}
                                required
                            />
                            <label htmlFor='password-login'>Password</label>
                            <input
                                id='password-login'
                                type='password'
                                name='password'
                                value={loginForm.password}
                                onChange={handleLoginFormChange}
                                required
                            />
                            <button className='submit-login-form' type='submit'>Iniciar sesión</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </>
    );
}

export default ModalLoginSignUp;
