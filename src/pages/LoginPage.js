// src/pages/LoginPage.js
import React from 'react';
import './Login.css';

const LoginPage = ({ onLogin }) => {
    return (
        <div className="login-container">
       <img
                    className="editor-img"
                    src="/code-editing.jpg"
                    alt="code-nitte-logo"
                />
            <div className="login-content">
                <h1 className="login-title">Login for Real-time Collaboration</h1>
                <p className="login-description">
                    Welcome to our real-time collaboration platform. Sign in to start collaborating with others in real-time!
                </p>
                <button className="login-button" onClick={onLogin}>
                    Login
                </button>
            </div>
            <div className="code-editor-info">
                <h2 className="code-editor-title">Real-time Code Editor</h2>
                <p className="code-editor-description">
                    Our platform offers a powerful real-time code editor where you can collaborate with your team members seamlessly. 
                    With live updates and collaborative features, coding together has never been easier.
                </p>
                <p className="code-editor-features">
                    Key Features:
                </p>
                <ul className="code-editor-feature-list">
                    <li>Instant updates</li>
                    <li>Multi-user collaboration</li>
                    <li>Syntax highlighting</li>
                </ul>
            </div>
        </div>
    );
};

export default LoginPage;
