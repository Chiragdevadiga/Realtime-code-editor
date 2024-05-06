import './App.css';
import { useAuth0 } from '@auth0/auth0-react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './pages/Home';
import EditorPage from './pages/EditorPage';
import LoginPage from './pages/LoginPage'; // New Login Page

function App() {
    const { isAuthenticated, isLoading, loginWithRedirect, logout, user } = useAuth0();

    // Return loading state if authentication information is being fetched
    if (isLoading) {
        return <div class="loader-container">
        <div class="loader"></div>
    </div>
    
    }

    // Check if user is authenticated
    return (
        <>
            <div>
                <Toaster
                    position="top-right"
                    toastOptions={{
                        success: {
                            theme: {
                                primary: '#4aed88',
                            },
                        },
                    }}
                ></Toaster>
            </div>
       
            {/* Check if user is authenticated */}
            {isAuthenticated ? (
                // User is authenticated, render the app content
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/editor/:roomId" element={<EditorPage />} />
                    </Routes>
                </BrowserRouter>
            ) : (
                // User is not authenticated, render the login page
                <LoginPage onLogin={() => loginWithRedirect()} />
            )}
        </>
    );
}

export default App;
