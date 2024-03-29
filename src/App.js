import "./App.scss";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Button from "./components/Button/Button";
import "./partials/global.scss";

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
    // e.preventDefault();

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

    postNewBook(title, author, year);
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

  // useEffect(() => {
  //   addBook();
  // }, [postNewBook]);

  return (
    <div className="App">
      <nav className="App__nav">
        <h1 className="App__title">Welcome to SNL Booklist</h1>
        <h2 className="App__subtitle">
          a handy way to log the books you've read!
        </h2>
      </nav>

      <main className="main">
        <div className="form">
          <h2 className="form__title">ADD A BOOK</h2>
          <form onSubmit={addBook} ref={formRef} className="form__styling">
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
            <Button text="Submit"  className="form__button"/>
          </form>
        </div>

        <section>
          <h2 className="booklist">Book List</h2>
          <ul className="list">
            {bookList?.map((book) => {
              return (
                <li key={book.id} className="list__book">
                  <img
                    src={book?.image}
                    alt="book cover"
                    className="list__image"
                  />

                  <div className="list__box">
                    <p className="list__text">
                      <i>Title:</i> {book.title}
                    </p>
                    <p className="list__text--center">
                      <i>Author:</i> {book.author}
                    </p>
                    <p className="list__text">{book.year}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
