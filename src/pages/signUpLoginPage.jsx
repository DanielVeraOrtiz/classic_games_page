import './signUpLoginPage.css';
import { OpenSidebarContext } from '../Layout';
import React, { useContext, useEffect, useState } from 'react';

function SignUpLoginPage() {
    const { setIsOpen } = useContext(OpenSidebarContext);

    useEffect(() => {
        setIsOpen(false);
    }, [setIsOpen])

    return (
        <div className='page-login-container'>
            <h1>Iniciar sesión</h1>
        </div>
    );
}

export default SignUpLoginPage;
