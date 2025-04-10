import React, { useState } from 'react';  

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
        <form onSubmit={handleSubmit}>  
            <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />  
            <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />  
            <input value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" required />  
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required />  
            <button type="submit">Add Book</button>  
        </form>  
    );  
};  

export default BookForm;