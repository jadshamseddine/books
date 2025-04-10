import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import './BookList.css'; // Import the CSS file for styling  

const BookList = ({ books, deleteBook, checkoutBook, genre }) => {  
    const [recommendedBooks, setRecommendedBooks] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState('');  

    const fetchRecommendations = async () => {  
        setLoading(true);  
        try {  
            const res = await axios.get(`http://localhost:5000/recommendations`);  
            setRecommendedBooks(res.data);  
        } catch (err) {  
            setError('Failed to fetch recommendations');  
        } finally {  
            setLoading(false);  
        }  
    };  

    useEffect(() => {  
        fetchRecommendations();  
    }, [genre]); // Fetch recommendations when genre changes  

    return (  
        <div className="book-list">   
            <h2>Available Books</h2>  
            {books.length > 0 ? (  
                <ul>  
                    {books.map((book) => (  
                        <li key={book._id} className={`book-card ${book.status === 'checked out' ? 'checked-out' : ''}`}>  
                            <h3>{book.title}</h3>  
                            <p><strong>Author:</strong> {book.author}</p>  
                            <p><strong>Genre:</strong> {book.genre}</p>  
                            <p>{book.description}</p>  
                            <p><strong>Status:</strong> {book.status}</p>  
                            <div className="button-group">  
                                <button className="checkout-button" onClick={() => checkoutBook(book._id)} disabled={book.status === 'checked out'}>  
                                    Check Out  
                                </button>  
                                <button className="delete-button" onClick={() => deleteBook(book._id)}>  
                                    Delete  
                                </button>  
                            </div>  
                        </li>  
                    ))}  
                </ul>  
            ) : (  
                <p>No books available.</p>  
            )}  

            <h2>Recommended Books</h2>  
            {loading ? (  
                <p>Loading recommendations...</p>  
            ) : error ? (  
                <p>{error}</p>  
            ) : recommendedBooks.length > 0 ? (  
                <ul>  
                    {recommendedBooks.map((book) => (  
                        <li key={book._id} className="recommendation-item">  
                            <h3>{book.title}</h3>  
                            <p><strong>Author:</strong> {book.author}</p>  
                            <p><strong>Genre:</strong> {book.genre}</p>  
                        </li>  
                    ))}  
                </ul>  
            ) : (  
                <p>No recommendations available.</p>  
            )}  
        </div>  
    );  
};  

export default BookList;