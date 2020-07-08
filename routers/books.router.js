const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log(`In /books GET`);
    const queryText = `select * from books`;

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

module.exports = router;