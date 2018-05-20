var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Exam = require('../models/Exam.js');

/* GET ALL EXAMS */
router.get('/', function(req, res, next) {
    Exam.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE EXAM BY ID */
  router.get('/:id', function(req, res, next) {
    Exam.findOne({ 'id':req.params.id }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
