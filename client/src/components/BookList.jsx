import React from 'react';  

const BookList = ({ books, deleteBook, checkoutBook }) => {  
    return (  
        <ul>  
            {books.map((book) => (  
                <li key={book._id}>  
                    <h3>{book.title}</h3>  
                    <p>{book.author}</p>  
                    <p>{book.genre}</p>  
                    <p>{book.description}</p>  
                    <p>Status: {book.status}</p>  
                    <button onClick={() => checkoutBook(book._id)} disabled={book.status === 'checked out'}>Check Out</button>  
                    <button onClick={() => deleteBook(book._id)}>Delete</button>  
                </li>  
            ))}  
        </ul>  
    );  
};  

export default BookList;