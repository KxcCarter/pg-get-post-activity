$(document).ready(init);

function init() {
    console.log(`we are so ready`);
    renderLibrary();
    $('.js-add-book').on('submit', clickAddBook);
}

function renderLibrary() {
    $.ajax({
        type: 'GET',
        url: '/books',
    }).then((response) => {
        console.log(`'bout to load us some BOOKS!`);
        $('.jsBookTable').empty();
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

function clickAddBook(event) {
    event.preventDefault();
    console.log(`add book!`);
    const newBookObject = {
        title: $('#jsAddBookTitle').val(),
        author: $('#jsAddBookAuthor').val(),
        published: $('#jsAddBookPublished').val(),
    };
    console.log(newBookObject);

    $('.js-add-book').trigger('reset');

    $.ajax({
            type: 'POST',
            url: '/books',
            data: newBookObject,
        })
        .then((response) => {
            console.log(response);
            renderLibrary();
        })
        .catch((err) => {
            console.log(err);

            console.log(`You done messed up, A-Aron!`);
        });
}