const express = require('express');  
const mongoose = require('mongoose');  
const cors = require('cors');  
const bodyParser = require('body-parser');  
const bookRoutes = require('./routes/books');  
const userRoutes = require('./routes/users');  
const recommendationsRoutes = require('./routes/recommendations'); // New recommendation route  

const app = express();  
const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  

// Connect to MongoDB  
mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true })  
    .then(() => console.log('MongoDB connected'))  
    .catch(err => console.error('MongoDB connection error:', err));  

// API Endpoints  
app.use('/books', bookRoutes);  
app.use('/users', userRoutes);  
app.use('/api', recommendationsRoutes); // Use the recommendations route under /api  

app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});