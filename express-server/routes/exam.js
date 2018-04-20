var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Exam = require('../models/Exam.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
    Exam.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE BOOK BY ID */
  router.get('/:id', function(req, res, next) {
    Exam.findOne({ 'id':req.params.id }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE BOOK */
  router.post('/', function(req, res, next) {
    Exam.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE BOOK */
  router.put('/:id', function(req, res, next) {
    Exam.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE BOOK */
  router.delete('/:id', function(req, res, next) {
    Exam.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
