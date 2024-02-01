import "./App.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "./components/Button/Button";

function App() {
  const [bookList, setBookList] = useState([]);
  const formRef = useRef();

  useEffect(() => {
    //getting book list from api
    const getBooks = async () => {
      try {
        const response = await axios.get("http://localhost:9000/");
        setBookList(response.data);
      } catch (error) {
        console.error("This is the error ", error);
      }
    };
    getBooks();
  }, []);

  const addBook = async (e) => {
    e.preventDefault();
    // Add book to the back-end server, and then update
    // the state with the response

    const title = formRef.current.title.value;
    const author = formRef.current.author.value;

    await postNewBook(title, author);
  };

  const postNewBook = async (title, author) => {
    try {
      const newBook = {
        title: title,
        author: author,
      };
      const postresponse = await axios.post("http://localhost:9000", newBook);
      setBookList([...bookList, newBook]);
    } catch (error) {
      console.error("This is the error ", error);
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Welcome to SNL Booklist</h1>

      <div className="form">
        <h2 className="form__title">ADD A BOOK</h2>
        <form onSubmit={addBook} ref={formRef}>
          <div className="form__container">
            <label className="form__label">Title:</label>
            <input
              name="title"
              type="text"
              placeholder="Enter book title"
              className="form__input"
            />
          </div>

          <div className="form__container">
            <label className="form__label">Author:</label>
            <input
              name="author"
              type="text"
              placeholder="Enter author"
              className="form__input"
            />
          </div>
          <div className="form__container">
            <label className="form__label">Have you read this book?</label>
            <input id="toggle-on" name="toggle" type="radio"/>
            <label for="toggle-on">Yes!</label>
            <input id="toggle-off" name="toggle" type="radio"/>
            <label for="toggle-off">No</label>
          </div>
          <Button text="Submit" />
        </form>
      </div>

      <section>
        <h2>Book List</h2>
        <ul className="list">
          {bookList?.map((book) => {
            return (
              <li key={book.id} className="book">
                <img src={book.image} alt="book cover image" />
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>{book.year}</p>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
