const express = require('express');  
const mongoose = require('mongoose');  
const cors = require('cors');  
const bodyParser = require('body-parser');  
const bookRoutes = require('./routes/books');  
const userRoutes = require('./routes/users'); 


const app = express();  
const PORT = process.env.PORT || 5000;  

// Middleware  
app.use(cors());  
app.use(bodyParser.json());  

// Connect to MongoDB (make sure to have MongoDB installed and running)  
mongoose.connect('mongodb://localhost:27017/bookdb', { useNewUrlParser: true, useUnifiedTopology: true });  

// API Endpoints  
app.use('/books', bookRoutes);  
app.use('/users', userRoutes);


app.listen(PORT, () => {  
    console.log(`Server is running on port ${PORT}`);  
});


 


