import React, { useState, useEffect } from "react";  
import axios from "axios";  
import BookForm from "./components/BookForm";  
import BookList from "./components/BookList";  
import LoginForm from "./components/LoginForm";  
import RegisterForm from "./components/RegisterForm";  

function App() {  
    const [books, setBooks] = useState([]);  
    const [categories, setCategories] = useState([]);  
    const [isLoggedIn, setIsLoggedIn] = useState(false);  
    const [isRegistering, setIsRegistering] = useState(false); // Track registration state  
    const [selectedGenre, setSelectedGenre] = useState('Fiction'); // Default genre for recommendations  

    // Fetch all books  
    const fetchBooks = async () => {  
        const res = await axios.get("http://localhost:5000/books");  
        setBooks(res.data);  
    };  

    // Fetch all categories  
    const fetchCategories = async () => {  
        const res = await axios.get("http://localhost:5000/books/categories");  
        setCategories(res.data);  
    };  

    useEffect(() => {  
        fetchBooks();  
        fetchCategories();  
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

    const handleLogin = (status) => {  
        setIsLoggedIn(status);  
        setIsRegistering(false); // Reset registration state on login  
    };  

    const handleRegister = (status) => {  
        setIsLoggedIn(status);  
        setIsRegistering(false); // Reset registration state on register  
    }  

    const switchToRegister = () => {  
        setIsRegistering(true); // Switch to registration form  
    };  

    return (  
        <div>  
            <h1>Book Management Application</h1>  
            {!isLoggedIn ?   
                isRegistering ? (   
                    <RegisterForm onRegister={handleRegister} />  
                ) : (  
                    <LoginForm onLogin={handleLogin} onSwitchToRegister={switchToRegister} />  
                )  
                :   
                <>  
                    <BookForm addBook={addBook} categories={categories} />  
                    <BookList   
                        books={books}   
                        deleteBook={deleteBook}   
                        checkoutBook={checkoutBook}   
                        genre={selectedGenre} // Pass the selected genre to BookList  
                    />  
                </>  
            }  
        </div>  
    );  
}  

export default App;