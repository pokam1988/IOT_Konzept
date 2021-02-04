




// Book Class: Represents a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;

    }
}

// UI Class: Handle UI Task

class UI {
    static displayBooks() {
        const StoredBooks = [

            {
                title: "Book one",
                author: "Pikop",
                isbn: "2345"
            },
            {
                title: "Book two",
                author: "Romeo",
                isbn: "2367"
            },
            {
                title: "Book three",
                author: "Pokam",
                isbn: "2378"
            }
        ];
        const books = StoredBooks;
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);


    }

    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove()
        }
    }

    static clearFields() {

        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';

    }

}

    


// store Class: Handles Storage


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e)

    => {
    // Prevent avtual submit
    e.preventDefault();

    // Get form value
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Instatiate Book
    const book = new Book(title, author, isbn);

    // Add Book to UI
    UI.addBookToList(book);

    //Clear fields
    UI.clearFields();

});


// Event:  remove a Book
document.querySelector('#book-list').addEventListener('click', (e)
    => {
    UI.deleteBook(e.target)
});