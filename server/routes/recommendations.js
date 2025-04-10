// routes/recommendations.js  
const express = require('express');  
const Book = require('../models/Book');  
const router = express.Router();  

// AI-based recommendation for books  
router.get('/recommendations', async (req, res) => {  
    try {  
        // Fetch all available books  
        const books = await Book.find({ status: 'available' });  

        // Check for user preferences in the query params  
        const userPreferredGenre = req.query.genre || null;  

        // Simulate an AI recommendation algorithm using scoring  
        const scoredBooks = books.map(book => {  
            let score = book.rating; // Start with the book's rating  
            
            // Bonus points for genre match if preferred genre is provided  
            if (userPreferredGenre && book.genre === userPreferredGenre) {  
                score += 2; // Adding points for genre match  
            }  

            return { book, score }; // Return both the book and its score  
        });  

        // Sort books based on their score and take the top 5  
        const recommendedBooks = scoredBooks  
            .sort((a, b) => b.score - a.score)  
            .slice(0, 5) // Get top 5 recommended books  
            .map(item => item.book); // Extract the book objects  

        res.json(recommendedBooks); // Send back the recommended books  
    } catch (error) {  
        console.error(error);  
        res.status(500).json({ message: 'Internal server error' });  
    }  
});  

module.exports = router;