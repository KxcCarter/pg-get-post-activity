const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const moment = require('moment');

router.get('/', (req, res) => {
    console.log(`In /magazines GET`);
    const queryText = `select * from magazines;`;

    pool
        .query(queryText)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log(`In /magazines POST`);
    const queryText = `insert into magazines (title, issue_number, pages) values ($1, $2, $3)`;
    let title, issue, pages;
    [title, issue, pages] = [req.body.title, req.body.issue, req.body.pages];

    pool
        .query(queryText, [title, issue, pages])
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