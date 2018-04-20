var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MajorRequirement = require('../models/MajorRequirement.js');

/* GET ALL MAJOR REQUIREMENTS */
router.get('/', function(req, res, next) {
  MajorRequirement.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

// Get MAJOR REQUIREMENTS BY ID
router.get('/:id', function(req, res, next) {
  MajorRequirement.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
  
  /* SAVE MAJOR REQUIREMENT */
  router.post('/', function(req, res, next) {
    MajorRequirement.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE MAJOR REQUIREMENT */
  router.put('/:id', function(req, res, next) {
    MajorRequirement.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE MAJOR REQUIREMENT */
  router.delete('/:id', function(req, res, next) {
    MajorRequirement.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  module.exports = router;