const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

router.get('/', (req, res) => {
    console.log(`In /books GET`);
    const queryText = `select * from books;`;

    pool
        .query(queryText)
        .then((dbRes) => {
            // formats date
            let rows = dbRes.rows;
            for (let each of rows) {
                each.published = moment(each.published).format('MMM Do YYYY');
            }

            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log(`In /books POST`);
    const queryText = `insert into books (title, author, published) values ($1, $2, $3)`;
    let title, author, published;
    [title, author, published] = [
        req.body.title,
        req.body.author,
        req.body.published,
    ];

    pool
        .query(queryText, [title, author, published])
        .then((dbRes) => {
            console.log(`In dbRes`);

            res.sendStatus(201);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;