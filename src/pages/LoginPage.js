// src/pages/LoginPage.js
import React from 'react';

const LoginPage = ({ onLogin }) => {
    return (
        <div style={{ textAlign: 'center', padding: '20px',color:'cyan' }}>
            <h1>Login for real-time collaboration</h1>
            <button onClick={onLogin} style={{ padding: '10px 20px' ,background: '#4aed88',
    width: '200px',
    marginLeft: 'auto' }}>
                Login with Redirect
            </button>
        </div>
    );
};

export default LoginPage;