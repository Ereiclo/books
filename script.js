let library = [];

class Book {
  constructor(bookName, authorName, pages, read) {
    this.bookName = bookName;
    this.authorName = authorName;
    this.pages = pages;
    this.read = read;
  }

  info () {
    let infoString = `${this.bookName} by ${this.authorName}, ${this.pages} pages, `;

    if (this.readed) infoString += "read.";
    else infoString += "not read yet.";

    return infoString;
  }

  toggleRead(){
    this.read = this.read ? false : true;
  }
}

// library.push(new Book("si", "si", "si", false));

let bookNameInput = document.querySelector("#bookName");
let authorNameInput = document.querySelector("#authorName");
let pagesInput = document.querySelector("#pages");
let readInput = document.querySelector("#read");

function addBook() {
  let bookName = bookNameInput.value;
  let authorName = authorNameInput.value;
  let pages = pagesInput.value;
  let read = readInput.checked;

  let newBook = new Book(bookName, authorName, pages, read);

  library.push(newBook);

  // console.log(typeof bookName,authorName,pages,read)
}

// function getRowId(classList) {
//   let rowRegex = /row/;

//   let [row] = classList.filter((cls) => {
//     // console.log(cls);

//     return cls.match(rowRegex);
//   });

//   let [_, rowId] = row.split("-");
//   return rowId;
// }

function reloadLibrary() {
  let tBody = document.querySelector("tbody");
  let rows = document.querySelectorAll("tbody > tr");

  rows.forEach((elem) => elem.remove());

  // console.log(rows)

  library.forEach((book, i) => {
    let newRow = document.createElement("tr");
    // newRow.classList.add("row-" + i);
    newRow.setAttribute("data-row", i);

    for (let prop in book) {
      if (prop == "read") {
        let newTd = document.createElement("td");
        let newCheckbox = document.createElement("input");
        let deleteBtn = document.createElement("button");
        let deleteImg = document.createElement("img");

        deleteImg.src = "./basurita.svg";
        deleteBtn.type = "button";
        deleteBtn.classList.add("delete-btn");

        deleteBtn.appendChild(deleteImg);

        newCheckbox.type = "checkbox";
        // console.log(book[prop])
        newCheckbox.checked = book[prop];

        newTd.appendChild(newCheckbox);
        newTd.appendChild(deleteBtn);
        newRow.appendChild(newTd);
      } else if (Object.hasOwnProperty.call(book, prop)) {
        let newTd = document.createElement("td");
        newTd.innerText = book[prop];
        newRow.appendChild(newTd);
      }
    }

    tBody.appendChild(newRow);
  });

  document.querySelectorAll(".delete-btn").forEach((element) => {
    element.addEventListener("click", (e) => {
      let row = e.currentTarget.parentElement.parentElement;
      let rowId = row.getAttribute("data-row");

      console.log(rowId);

      library.splice(rowId, 1);
      reloadLibrary();
    });
  });

  document
    .querySelectorAll('td > input[type="checkbox"]')
    .forEach((checkbox) => {
      checkbox.addEventListener("click", (e) => {
        let row = e.currentTarget.parentElement.parentElement;
        let rowId = row.getAttribute("data-row");

        // console.log(classList)
        // let rowId = getRowId(classList);

        console.log(rowId);

        library[rowId].toggleRead();
      });
    });
}

document.querySelector(".fila > button").addEventListener("click", (e) => {
  e.preventDefault();

  addBook();

  reloadLibrary();
});

reloadLibrary();
