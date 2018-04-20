var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CreditTransfer = require('../models/CreditTransfer.js');


/* GET ALL CREDITS */
router.get('/', function(req, res, next) {
    CreditTransfer.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE CREDIT BY ID */
  router.get('/:id', function(req, res, next) {
    CreditTransfer.find({ 'id':req.params.id }).sort({ subject:1 }).exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET SINGLE CREDIT BY ID & KEYWORD */
  router.get('/:id/:keyword/:category', function(req, res, next) {
    var keyword = decodeURI(req.params.keyword);
    var category = req.params.category;
    if (category === "All") {
      CreditTransfer.find({ 'id':req.params.id, $text: { $search: '"' + keyword + '"' } }).sort({ subject:1 }).exec(function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
    else {
      CreditTransfer.find({ 'id':req.params.id, [category]: { $regex: "^" + keyword, $options: 'mi' } }).sort({ subject:1 }).exec(function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
  });
  
  /* SAVE BOOK */
  router.post('/', function(req, res, next) {
    CreditTransfer.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE BOOK */
  router.put('/:id', function(req, res, next) {
    CreditTransfer.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE BOOK */
  router.delete('/:id', function(req, res, next) {
    CreditTransfer.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
