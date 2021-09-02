const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const data = require('../controllers/data');

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/:url', data.get);

router.post('/create', data.create);

module.exports = router;