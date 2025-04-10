// src/components/Recommendations.js  
import React, { useEffect, useState } from 'react';  
import axios from 'axios';  
import './Recommendations.css'; // Optional: Add styling for the recommendations  

const Recommendations = ({ genre }) => {  
    const [recommendedBooks, setRecommendedBooks] = useState([]);  
    const [loading, setLoading] = useState(true);  
    const [error, setError] = useState('');  

    const fetchRecommendations = async () => {  
        setLoading(true);  
        try {  
            const res = await axios.get(`http://localhost:5000/recommendations?genre=${genre}`);  
            setRecommendedBooks(res.data);  
        } catch (err) {  
            setError('Failed to fetch recommendations');  
        } finally {  
            setLoading(false);  
        }  
    };  

    useEffect(() => {  
        fetchRecommendations();  
    }, [genre]); // Fetch when genre changes  

    if (loading) return <p>Loading recommendations...</p>;  
    if (error) return <p>{error}</p>;  

    return (  
        <div className="recommendations-container">  
            <h2>Recommended Books</h2>  
            <ul className="recommendations-list">  
                {recommendedBooks.length > 0 ? (  
                    recommendedBooks.map((book) => (  
                        <li key={book._id} className="recommendation-item">  
                            <h3>{book.title}</h3>  
                            <p><strong>Author:</strong> {book.author}</p>  
                            <p><strong>Genre:</strong> {book.genre}</p>  
                        </li>  
                    ))  
                ) : (  
                    <p>No recommendations available.</p>  
                )}  
            </ul>  
        </div>  
    );  
};  

export default Recommendations;