const mongoose = require('mongoose');  

const bookSchema = new mongoose.Schema({  
    title: String,  
    author: String,  
    genre: String,  
    description: String,  
    category: String, // New field  
    status: { type: String, enum: ['available', 'checked out'], default: 'available' }  
});

module.exports = mongoose.model('Book', bookSchema);