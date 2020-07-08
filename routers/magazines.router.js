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

module.exports = router;