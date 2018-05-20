var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var ExamTransfer = require('../models/ExamTransfer.js');

/* GET ALL EXAM TRANSFER */
router.get('/', function(req, res, next) {
    ExamTransfer.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE EXAM TRANSFER BY ID */
  router.get('/:id', function(req, res, next) {
    ExamTransfer.find({ 'id':req.params.id }).sort({ subject:1 }).exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });


module.exports = router;
