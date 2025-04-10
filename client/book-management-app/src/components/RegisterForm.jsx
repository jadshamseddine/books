// src/components/RegisterForm.js  

import React, { useState } from 'react';  
import axios from 'axios';  
import './RegisterForm.css'; // Import CSS file for styling  

const RegisterForm = ({ onRegister }) => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  
    const [error, setError] = useState(''); // To store registration errors  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        setError(''); // Reset previous errors  
        try {  
            const response = await axios.post('http://localhost:5000/users/register', { username, password });  
            alert(response.data.message); // Notify user on successful registration  
            onRegister(true); // Call callback to manage user state  
        } catch (err) {  
            setError(err.response?.data?.message || 'Registration failed!'); // Set error message  
        }  
    };  

    return (  
        <div className="register-container"> {/* Container for centering the form */}  
            <form className="register-form" onSubmit={handleSubmit}>  
                <h2>Register</h2>  
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
                <button className="form-button" type="submit">Register</button>  
            </form>  
        </div>  
    );  
};  

export default RegisterForm;