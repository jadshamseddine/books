import React, { useState } from 'react';  
import axios from 'axios';  

const LoginForm = ({ onLogin }) => {  
    const [username, setUsername] = useState('');  
    const [password, setPassword] = useState('');  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        try {  
            const res = await axios.post('http://localhost:5000/users/login', { username, password });  
            localStorage.setItem('token', res.data.token);  
            onLogin(true);  
        } catch (error) {  
            alert('Login failed!');  
        }  
    };  

    return (  
        <form onSubmit={handleSubmit}>  
            <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />  
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />  
            <button type="submit">Login</button>  
        </form>  
    );  
};  

export default LoginForm;