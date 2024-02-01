import "./App.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "./components/Button/Button";

function App() {
  const [bookList, setBookList] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    //get book list from api
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:9000");
        setBookList(response.data);
      } catch (error) {
        console.error("This is the error ", error);
      }
    };
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    // Add book to the back-end server, and then update
    // the state with the response

    const formData = new FormData(e.target);
    const book = formRef.current.book.value;
    const title = formRef.current.title.value;
    console.log(formRef);

    console.log(book, title);

    await postNewBook(book, title);
  };

  const postNewBook = async (book, title) => {
    try {
      const newBook = {
        book: book,
        title: title,
      };
      const postresponse = await axios.post("http://localhost:9000", newBook);
      setBookList([...bookList, newBook]);
    } catch (error) {
      console.error("This is the error ", error);
    }
  };

  //will render the book list from the api
  const renderBookList = bookList.map((book) => {
    <li key={book.id} className="...">
      <img src={book.image} />
      <p>Title: {book.title}</p>
      <p>Author: {book.author}</p>
      <p>{book.year}</p>
    </li>;
  });

  return (
    <div className="App">
      <h1 className="App__title">Welcome to SNL Booklist</h1>

      <div className="form">
        <h2 className="form__title">ADD A BOOK</h2>
        <form onSubmit={addBook} ref={formRef}>
          <div className="form__container">
            <label className="form__label">Title:</label>
            <input
              type="text"
              placeholder="Enter book title"
              className="form__input"
            />
          </div>

          <div className="form__container">
            <label className="form__label">Author:</label>
            <input
              type="text"
              placeholder="Enter author"
              className="form__input"
            />
          </div>

          <Button text="Submit" />
        </form>
      </div>

      <section>
        <h2>Book List</h2>
        <ul className="...">{renderBookList}</ul>
      </section>
    </div>
  );
}

export default App;
