var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var FirstResult = require('../models/FirstResult.js');

/* GET ALL FIRSTRESULT */
router.get('/', function(req, res, next) {
  FirstResult.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* GET ALL GOOD  FIRSTRESULT */
router.get('/:rhs', function(req, res, next) {
  FirstResult.find({'rhs':req.params.rhs },function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

module.exports = router;
