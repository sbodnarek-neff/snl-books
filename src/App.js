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

    //stating form input values
    const title = formRef.current.title.value;
    const author = formRef.current.author.value;
    const year = formRef.current.year.value;

    //checking if the form is valid
    const isFormValid = () => {
      if (!title || !author || !year) {
        return false;
      } else {
        return true;
      }
    };

    if (isFormValid()) {
      alert("Add new book successfully!");
      await postNewBook(title, author, year);

      //this clears the form
      e.target.reset();
    } else {
      alert("Failed to add book, you have errors in you form");
    }
  };

  const postNewBook = async (title, author, year) => {
    try {
      const newBook = {
        title: title,
        author: author,
        year: year,
      };
      const postresponse = await axios.post("http://localhost:9000", newBook);
      setBookList([newBook, ...bookList]);
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
              ref={formRef}
            />
          </div>

          <div className="form__container">
            <label className="form__label">Author:</label>
            <input
              name="author"
              type="text"
              placeholder="Enter author"
              className="form__input"
              ref={formRef}
            />
          </div>

          <div className="form__container">
            <label className="form__label">Year:</label>
            <input
              name="year"
              type="text"
              placeholder="Enter year"
              className="form__input"
              ref={formRef}
            />
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
                {/* <img src={book.image} alt="book cover image" /> */}
                <p>Title: {book.title}</p>
                <p>Author: {book.author}</p>
                <p>{book.year}</p>
                <div className="form__container">
                  <label className="form__label">Have you read this book?</label>
                  <input id="toggle-on" name="toggle" type="radio"/>
                  <label for="toggle-on">Yes!</label>
                  <input id="toggle-off" name="toggle" type="radio"/>
                  <label for="toggle-off">No</label>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}

export default App;
