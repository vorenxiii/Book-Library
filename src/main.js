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

// node elements
const add_book_button = document.querySelector("#add-book-button");
const dialog = document.querySelector("dialog");
const close_dialog_nodes = document.querySelectorAll(
  ".dialog-close-button, #dialog-form-cancel-button"
);
const form = document.querySelector(".add-book-form");
const dialog_add_book_button = document.querySelector(
  "#dialog-form-add-button"
);
const cards_container = document.querySelector(".cards-container");

// input nodes
const input_nodes = {
  name: document.querySelector("#bookName"),
  author: document.querySelector("#bookAuthor"),
  numberOfPages: document.querySelector("#nbOfPages"),
  isRead: document.querySelector("#isRead"),
};

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
  book.id = this.books.length - 1;
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

let library = new Library();

function GetCardTemplate() {
  // true means a deep clone, including children
  return document.querySelector(".card-template").cloneNode(true);
}

function FillCardTemplateWithData(book = new Book()) {
  const card_template = GetCardTemplate();
  card_template.classList.remove("card-template");
  card_template.id = `card-${book.id}`;
  card_template.querySelector(".book-title").innerText = book.name;
  card_template.querySelector(".book-author").innerText = book.author;
  card_template.querySelector(".nb-of-pages > span").innerText = book.numberOfPages;
  card_template.querySelector(".isRead-checkbox").checked = book.isRead;
  card_template.querySelector(".isRead-checkbox").id = `isRead-${book.id}`;
  card_template.querySelector(".archive-button").id = `archive-${book.id}`;
  return card_template;
}

function AddArchiveEvent(card) {
  card.querySelector(".archive-button").addEventListener("click", (e) => {
    cards_container.querySelector(`#card-${e.currentTarget.id.match(/\d+/)}`).classList.add("archived");
    library.books[e.currentTarget.id.match(/\d+/)[0]].state = STATES.ARCHIVED;
    console.log(library);
  });
}

function AddIsReadEvent(card) {
  card.querySelector(".isRead-checkbox").addEventListener("click", (e) => {
    library.books[e.target.id.match(/\d+/)[0]].isRead = e.target.checked;
    console.log(library);
  });
}

function AddEventsToCardButtons(card) {
  AddArchiveEvent(card);
  AddIsReadEvent(card);
} 

function ClearInput() {
  input_nodes.name.value = "";
  input_nodes.author.value = "";
  input_nodes.numberOfPages.value = "";
  input_nodes.isRead.checked = false;
}

add_book_button.addEventListener("click", () => {
  dialog.showModal();
});

close_dialog_nodes.forEach((node) => {
  node.addEventListener("click", () => {
    dialog.close();
    form.reset();
    // ClearInput();
  });
});

form.addEventListener("submit", (e) => {
  if (form.checkValidity()) {
    let book = new Book(
      input_nodes.name.value,
      input_nodes.author.value,
      input_nodes.numberOfPages.value,
      input_nodes.isRead.checked
    );
    library.AddBookToLibrary(book);
    let card = FillCardTemplateWithData(book);
    AddEventsToCardButtons(card);
    cards_container.appendChild(card);
  }
  // ClearInput();
  form.reset();
  console.log(library);
});
