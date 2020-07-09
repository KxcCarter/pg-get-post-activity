$(document).ready(init);

function init() {
    console.log(`js and jQ ready`);
    renderAll();
    // sets up event listeners for input forms.
    $('.js-add-book').on('submit', clickAddBook);
    $('.js-add-mag').on('submit', clickAddMag);

    // testing feature to display summary of book when clicked on.
    $('.jsLibrary').on('click', '.js-library-data', getInfo);
}

// testing Bootstrap tooltips
// -----------------------------
function getInfo() {
    console.log($(this).data('id'));
    let peek = $(this).data('id');

    // TODO: When a row is clicked on, a div should appear to the right which displays
    //      a paragraph about the book which was clicked.
    //      Clicking on the div a second time should remove the div from the DOM.

    $('.js-mods').append(`
<div class="col-sm-12 col-md-2 bg-light rounded align-self-start">
<h4><em>${peek}</em> preview</h4>
<p>
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
</p>
</div>
`);
}

$(function() {
    $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
});

// -----------------------------

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
            <tr class="js-library-data" data-id="${each.title}" data-toggle="tooltip" data-placement="right" title="A short description of this particular book should go here.">
            
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