const mongoose = require('mongoose');  

const bookSchema = new mongoose.Schema({  
    title: String,  
    author: String,  
    genre: String,  
    description: String,  
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, // Reference to Category  
    status: { type: String, enum: ['available', 'checked out'], default: 'available' },  
    rating: { type: Number, min: 1, max: 5 }  
});  

module.exports = mongoose.model('Book', bookSchema);