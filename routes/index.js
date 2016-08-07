'use strict';
var express = require('express');
var router = express.Router();
var options = require('../options.json');

// GET: /
router.get('/', function(req, res) {
  res.render('index/index', options);
});

module.exports = router;
