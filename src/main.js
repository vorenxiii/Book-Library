("use strict");

// cspell: words: Catsucci

/**
 * main.js
 * Main JavaScript file for the project
 * Author: Catsucci
 * Created: 2024-09-08
 */

const STATES = Object.freeze({
    ACTIVE: {
      value: 1,
      label: "Active",
      description: "This book is currently active.",
    },
    ARCHIVED: {
      value: 0,
      label: "Archived",
      description: "This book is archived.",
    },
  });
  
  class Book {
    constructor(
      name = "Book's Name",
      author = "Book's Author",
      numberOfPages = 0,
      isRead = false
    ) {
      this.name = name;
      this.author = author;
      this.numberOfPages = numberOfPages;
      this.isRead = isRead;
      this.state = STATES.ACTIVE;
    }
  }
  
  class Library {
    constructor(books = []) {
      this.books = books;
    }
  }
  
  Library.prototype.AddBookToLibrary = function (book = new Book()) {
    this.books.push(book);
  };
  
  Library.prototype.ArchiveBook = function (bookToArchive) {
    this.books.some((book, index) => {
      for (let key in bookToArchive) {
        if (book[key] !== bookToArchive[key]) {
          return false;
        }
      }
      this.books[index].state = STATES.ARCHIVED;
      return true;
    });
  };
  
  Library.prototype.ActivateBook = function (bookToActivate) {
    this.books.some((book, index) => {
      for (let key in bookToActivate) {
        if (book[key] !== bookToActivate[key]) {
          return false;
        }
      }
      this.books[index].state = STATES.ACTIVE;
      return true;
    });
  };
  
  let book = new Book();
  let library = new Library();
  library.AddBookToLibrary(book);
  