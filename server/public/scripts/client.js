$(document).ready(init);

function init() {
    console.log(`we are so ready`);
    renderLibrary();
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