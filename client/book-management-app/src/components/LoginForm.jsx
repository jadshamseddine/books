import React, { useState } from 'react';  
import axios from 'axios';  
import './LoginForm.css'; // Import CSS file for styling  

const LoginForm = ({ onLogin, onSwitchToRegister }) => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState(''); // To store any login errors  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError(''); // Reset any previous errors  
        try {  
            const res = await axios.post('http://localhost:5000/users/login', { username, password });  
            localStorage.setItem('token', res.data.token);  
            onLogin(true);  
        } catch (error) {  
            setError('Login failed!'); // Show error message on login failure  
        }  
    };  

    return (  
        <div className="login-container"> {/* Container for centering the form */}  
            <form className="login-form" onSubmit={handleSubmit}>  
                <h2>Login</h2>  
                {error && <p className="error-message">{error}</p>} {/* Display error message */}  
                <input   
                    className="form-input"   
                    value={username}   
                    onChange={(e) => setUsername(e.target.value)}   
                    placeholder="Username"   
                    required   
                />  
                <input   
                    className="form-input"   
                    type="password"   
                    value={password}   
                    onChange={(e) => setPassword(e.target.value)}   
                    placeholder="Password"   
                    required   
                />  
                <button className="form-button" type="submit">Login</button>  
                <button   
                    type="button"   
                    onClick={onSwitchToRegister}   
                    className="register-button" // Add a CSS class for custom styling  
                >  
                    Register  
                </button>  
            </form>  
        </div>  
    );  
};  

export default LoginForm;