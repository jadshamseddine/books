const express = require('express');  
const bcrypt = require('bcryptjs');  
const jwt = require('jsonwebtoken');  
const User = require('../models/User');  
const router = express.Router();  
const SECRET_KEY = 'your_jwt_secret'; // Use a secure key in production  

// User registration  
router.post('/register', async (req, res) => {  
    const { username, password } = req.body;  
    const hashedPassword = await bcrypt.hash(password, 10);  
    const user = new User({ username, password: hashedPassword });  
    await user.save();  
    res.status(201).send({ message: 'User registered successfully' });  
});  

// User login  
router.post('/login', async (req, res) => {  
    const { username, password } = req.body;  
    const user = await User.findOne({ username });  
    if (!user || !(await bcrypt.compare(password, user.password))) {  
        return res.status(401).send({ message: 'Invalid credentials' });  
    }  
    const token = jwt.sign({ userId: user._id }, SECRET_KEY);  
    res.send({ token });  
});  

module.exports = router;