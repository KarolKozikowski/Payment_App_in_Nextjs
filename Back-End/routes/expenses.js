const express = require('express');
const router = express.Router();

let data = require('../data/history.json');

router.get('/', (req, res) => {
    res.json(data);
});

router.get('/search', (req, res) => {
    res.json(data);
});

module.exports = router;