import React, { useState, useEffect } from "react";  
import axios from "axios";  
import BookForm from "./components/BookForm";  
import BookList from "./components/BookList";  

function App() {  
    const [books, setBooks] = useState([]);  
    
    const fetchBooks = async () => {  
        const res = await axios.get("http://localhost:5000/books");  
        setBooks(res.data);  
    };  

    useEffect(() => {  
        fetchBooks();  
    }, []);  

    const addBook = async (book) => {  
        await axios.post("http://localhost:5000/books", book);  
        fetchBooks();  
    };  

    const deleteBook = async (id) => {  
        await axios.delete(`http://localhost:5000/books/${id}`);  
        fetchBooks();  
    };  

    const checkoutBook = async (id) => {  
        await axios.patch(`http://localhost:5000/books/${id}/checkout`);  
        fetchBooks();  
    };  

    return (  
        <div>  
            <h1>Book Management Application</h1>  
            <BookForm addBook={addBook} />  
            <BookList books={books} deleteBook={deleteBook} checkoutBook={checkoutBook} />  
        </div>  
    );  
}  

export default App;