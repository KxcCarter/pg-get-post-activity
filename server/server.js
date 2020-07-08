const express = require('express');
const bodyParser = require('body-parser');
const pool = require('../modules/pool');
const booksRouter = require('../routers/books.router');

const app = express();
const PORT = 5000;

app.use(express.static('server/public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// -------------------------------------------

app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});