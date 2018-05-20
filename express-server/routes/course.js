var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Course = require('../models/Course.js');

/* GET ALL COURSES */
router.get('/', function(req, res, next) {
  Course.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

module.exports = router;
