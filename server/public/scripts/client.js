$(document).ready(init);

function init() {
    console.log(`js and jQ ready`);
    renderAll();
    // sets up event listeners for input forms.
    $('.js-add-book').on('submit', clickAddBook);
    $('.js-add-mag').on('submit', clickAddMag);
}

function renderAll() {
    // Renders all books and magazines on page load.
    renderBooks();
    renderMags();
}

function renderBooks() {
    $.ajax({
        type: 'GET',
        url: '/books',
    }).then((response) => {
        $('.jsBookTable').empty();
        // loops through response from server and renders to the DOM
        for (let each of response) {
            $('.jsBookTable').append(`
            <tr>
                <td>${each.title}</td>
                <td>${each.author}</td>
                <td>${each.published}</td>
                <td></td>
            </tr>
            `);
        }
    });
}

function renderMags() {
    // retrieves magazine data from database via server.
    $.ajax({
        type: 'GET',
        url: '/magazines',
    }).then((response) => {
        $('.jsMagTable').empty();
        // loops through response from server and renders to the DOM
        for (let each of response) {
            $('.jsMagTable').append(`
            <tr>
                <td>${each.title}</td>
                <td>${each.issue_number}</td>
                <td>${each.pages}</td>
                <td></td>
            </tr>
            `);
        }
    });
}

function clickAddBook(event) {
    event.preventDefault();
    // creates object containing user inputted data for books
    const newBookObject = {
        title: $('#jsAddBookTitle').val(),
        author: $('#jsAddBookAuthor').val(),
        published: $('#jsAddBookPublished').val(),
    };
    // POSTs above data to server
    $.ajax({
            type: 'POST',
            url: '/books',
            data: newBookObject,
        })
        .then((response) => {
            console.log(response);
            // clears add book form
            $('.js-add-book').trigger('reset');
            renderBooks();
        })
        .catch((err) => {
            console.log(`Unable to add book! ${err}`);
        });
}

function clickAddMag(event) {
    event.preventDefault();
    // creates object container user inputted data for magazine.
    const newMagObject = {
        title: $('#jsAddMagTitle').val(),
        issue: $('#jsAddMagIssue').val(),
        pages: $('#jsAddMagPages').val(),
    };
    // POSTs above magazine data to server.
    $.ajax({
            type: 'POST',
            url: '/magazines',
            data: newMagObject,
        })
        .then((response) => {
            console.log(response);
            // clears add magazine form
            $('.js-add-mag').trigger('reset');
            renderMags();
        })
        .catch((err) => {
            console.log(`Unable to add magazine! ${err}`);
        });
}