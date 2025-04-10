const express = require('express');  
const router = express.Router();  
const Book = require('../models/Book');  

// Get all books  
router.get('/', async (req, res) => {  
    const books = await Book.find();  
    res.send(books);  
});  

// Add a new book  
router.post('/', async (req, res) => {  
    const book = new Book(req.body);  
    await book.save();  
    res.status(201).send(book);  
});  

// Update a book  
router.put('/:id', async (req, res) => {  
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });  
    res.send(book);  
});  

// Delete a book  
router.delete('/:id', async (req, res) => {  
    await Book.findByIdAndDelete(req.params.id);  
    res.send({ message: 'Book deleted' });  
});  

// Check-out a book  
router.patch('/:id/checkout', async (req, res) => {  
    const book = await Book.findById(req.params.id);  
    if (book && book.status === 'available') {  
        book.status = 'checked out';  
        await book.save();  
        res.send(book);  
    } else {  
        res.status(400).send({ message: 'Book is already checked out' });  
    }  
});  

module.exports = router;