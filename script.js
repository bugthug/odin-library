const manufacturingConsentBook = new Book(
  "Manufacturing Consent",
  "Edward S. Hermann, Noam Chomsky",
  "./assets/mc-cover.jpeg",
  true
);

const theRacketBook = new Book(
  "The Racket",
  "Matt Kennard",
  "./assets/The_Racket_(book).jpg",
  false
);

let myLibrary = [manufacturingConsentBook];

function Book(title, author, photo, read) {
  this.title = title;
  this.author = author;
  this.photo = photo;
  this.read = read;
}

function addBookToLibrary(title, author, photo) {
  const bookToAdd = new Book(title, author, photo);
  myLibrary.push(bookToAdd);
}

function updateDisplayedBooks(book) {
  myLibrary.forEach((book) => {});
}

function addBookElement(book) {
  // "weird" use of classes is because of tailwind css
  const newBookDiv = document.createElement("div");
  newBookDiv.setAttribute("class", "relative flex gap-5 p-7 border-4 w-96");
  const coverImage = document.createElement("img");
  coverImage.classList.add("w-24");
  coverImage.setAttribute("src", book.photo);

  newBookDiv.appendChild(coverImage);

  const textInfoDiv = document.createElement("div");

  const titleElement = document.createElement("h1");
  titleElement.setAttribute("class", "text-xl font-semibold");
  titleElement.textContent = book.title;
  textInfoDiv.appendChild(titleElement);

  const authorElement = document.createElement("p");
  authorElement.setAttribute("class", "italic");
  authorElement.textContent = `By ${book.author}`;
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

  const books = document.querySelector("#books");
  books.appendChild(newBookDiv);
}

addBookElement(manufacturingConsentBook);
addBookElement(theRacketBook);
