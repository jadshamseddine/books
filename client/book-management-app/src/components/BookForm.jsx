import React, { useState } from 'react';  
import './BookForm.css'; // Import the CSS file for styling  

const BookForm = ({ addBook }) => {  
    const [title, setTitle] = useState('');  
    const [author, setAuthor] = useState('');  
    const [genre, setGenre] = useState('');  
    const [description, setDescription] = useState('');  

    const handleSubmit = (e) => {  
        e.preventDefault();  
        addBook({ title, author, genre, description });  
        setTitle('');  
        setAuthor('');  
        setGenre('');  
        setDescription('');  
    };  

    return (  
        <form className="book-form" onSubmit={handleSubmit}>  
            <h2>Add a New Book</h2>  
            <input className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />  
            <input className="form-input" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />  
            <input className="form-input" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />  
            <textarea className="form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />  
            <button className="form-button" type="submit">Add Book</button>  
        </form>  
    );  
};  

export default BookForm;