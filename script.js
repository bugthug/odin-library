const SHARED_ATTRIBUTE = "data-mylibrary-index";

const manufacturingConsentBook = new Book(
  "Manufacturing Consent",
  "Edward S. Hermann, Noam Chomsky",
  "./assets/mc-cover.jpeg",
  true,
  480
);

// Used for testing purposes, can be ignored.
// const theRacketBook = new Book(
//   "The Racket",
//   "Matt Kennard",
//   "./assets/The_Racket_(book).jpg",
//   false,
//   416
// );

function showUserInputFormOnClick() {
  const addYourOwnBtn = document.getElementById("display-form-button");
  const formElement = document.querySelector("#form-div");

  // important: arrow function here utilizes lexical context
  const handleBtnClick = () => {
    if (formElement.classList.contains("hidden")) {
      addYourOwnBtn.textContent = "Hide form";
      formElement.classList.remove("hidden");
      return;
    }

    formElement.classList.add("hidden");
    addYourOwnBtn.textContent = "Add your own";
  };

  addYourOwnBtn.addEventListener("click", handleBtnClick);
}

function addUserInputtedBookOnClick() {
  function handleSubmit(e) {
    e.preventDefault();
    const bookTitle = document.getElementById("bookname").value;
    const bookAuthor = document.getElementById("author").value;
    const bookPhoto = document.getElementById("photo-url").value;
    const valueRead = document.querySelector(
      'input[name="has-read"]:checked'
    ).value;
    const photo = document.getElementById("numberOfPages").value;
    const pageNumber = document.getElementById("numberOfPages").value;

    // conversion to boolean format is necessary per Book properties
    const read = valueRead === "yes" ? true : false;

    const userAddedBook = new Book(
      bookTitle,
      bookAuthor,
      bookPhoto,
      read,
      pageNumber
    );

    addBook(userAddedBook);
  }

  const inputButton = document.querySelector('button[type="submit"]');
  console.log(inputButton);
  inputButton.addEventListener("click", handleSubmit);
}

let myLibrary = [];

function Book(title, author, photo, read, pageNumber) {
  this.title = title;
  this.author = author;
  this.photo = photo;
  this.read = read;
  this.pageNumber = pageNumber;
}

function addBook(book) {
  function addBookToLibraryArray(book) {
    const bookToAdd = new Book(
      book.title,
      book.author,
      book.photo,
      book.read,
      book.pageNumber
    );
    myLibrary.push(bookToAdd);
  }

  addBookToLibraryArray(book);
  updateBooks();
}

function updateBooks() {
  const booksDiv = document.querySelector("#books");
  booksDiv.innerHTML = "";
  myLibrary.forEach((book, index) => {
    addBookElement(book, index);
  });
}

function addBookElement(book, index) {
  const books = document.querySelector("#books");

  const newBookDiv = document.createElement("div");
  newBookDiv.setAttribute(
    "class",
    "relative flex gap-5 p-7 border-4 w-96 dark:border-slate-600"
  );

  const numberOfPagesElement = document.createElement("p");
  numberOfPagesElement.setAttribute(
    "class",
    "w-24 text-center mr-auto absolute top-0 right-0 bg-slate-500 text-yellow-100"
  );
  numberOfPagesElement.textContent = `${book.pageNumber} pages`;
  newBookDiv.appendChild(numberOfPagesElement);

  const removeBtn = document.createElement("button");
  removeBtn.setAttribute(
    "class",
    "absolute bottom-0 left-1 dark:text-stone-300 text-sm text-slate-800 hover:underline"
  );
  removeBtn.textContent = "Remove";
  newBookDiv.appendChild(removeBtn);
  removeBtn.addEventListener("click", handleRemoveButtonClick);

  const coverImage = document.createElement("img");
  coverImage.classList.add("w-24");
  coverImage.setAttribute("src", book.photo);
  newBookDiv.appendChild(coverImage);

  const textInfoDiv = document.createElement("div");

  const titleElement = document.createElement("h1");
  titleElement.setAttribute(
    "class",
    "text-xl block mb-2 text-gray-900 dark:text-white font-bold"
  );
  titleElement.textContent = book.title;
  textInfoDiv.appendChild(titleElement);

  const authorElement = document.createElement("p");
  authorElement.setAttribute(
    "class",
    "italic mb-2 text-sm font-medium text-gray-900 dark:text-white"
  );
  authorElement.textContent = `${book.author}`;
  textInfoDiv.appendChild(authorElement);

  newBookDiv.appendChild(textInfoDiv);

  const readButton = document.createElement("button");
  if (book.read) {
    readButton.textContent = "Read";
    readButton.setAttribute(
      "class",
      "absolute bottom-0 right-0 bg-green-600 text-yellow-100 pl-10 pr-10 w-52"
    );
  } else if (!book.read) {
    readButton.textContent = "Not read";
    readButton.setAttribute(
      "class",
      "absolute bottom-0 right-0 bg-red-600 text-yellow-100 pl-10 pr-10 w-52"
    );
  }

  newBookDiv.appendChild(readButton);

  const setSharedAttributeToIndex = () => {
    newBookDiv.setAttribute(SHARED_ATTRIBUTE, index);
    removeBtn.setAttribute(SHARED_ATTRIBUTE, index);
    readButton.setAttribute(SHARED_ATTRIBUTE, index);
  };

  setSharedAttributeToIndex();

  function handleRemoveButtonClick(e) {
    const indexValue = this.getAttribute(SHARED_ATTRIBUTE);

    const parentDiv = document.querySelector(`div[${SHARED_ATTRIBUTE}='${indexValue}']`)

    books.removeChild(parentDiv);
    myLibrary.splice(indexValue, 1);
    updateBooks();
  }

  function handleReadButtonClick(e) {
    const indexValue = this.getAttribute(SHARED_ATTRIBUTE);
    
    myLibrary[indexValue].read = myLibrary[indexValue].read ? false : true;
    updateBooks();
  }

  removeBtn.addEventListener('click', handleRemoveButtonClick)
  readButton.addEventListener('click',handleReadButtonClick)

  books.appendChild(newBookDiv);
}

addBook(manufacturingConsentBook);
addUserInputtedBookOnClick();
showUserInputFormOnClick();
