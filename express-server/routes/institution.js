var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Institution = require('../models/Institution.js');

/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
    Institution.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });
  
  /* GET SINGLE BOOK BY ID */
  router.get('/:id', function(req, res, next) {
    Institution.findOne({ 'id':req.params.id }, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  /* GET SINGLE BOOK BY ID */
  router.get('/type/:type', function(req, res, next) {
    if (req.params.type === "Non-Local") {
      // Institution.distinct("location",{ 'type':req.params.type }, function (err, post) {
      //   if (err) return next(err);
      //   res.json(post);
      // });
      Institution.aggregate([{
        "$match":{ type : req.params.type}
        },{
        $group:{_id:"$location"}
        },{$sort:{
         '_id':1
        }
        }], function (err, post) {
          if (err) return next(err);
          res.json(post);
        }); 
    }
    else {
      Institution.find({ 'type':req.params.type }).sort({ name:1 }).exec(function (err, post) {
        if (err) return next(err);
        res.json(post);
      });
    }
    
  });

  /* GET SINGLE BOOK BY ID */
  router.get('/:type/:location', function(req, res, next) {
    Institution.find({ $and: [ {'type':req.params.type }, {'location':req.params.location} ] }).sort({ name:1 }).exec(function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* SAVE BOOK */
  router.post('/', function(req, res, next) {
    Institution.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* UPDATE BOOK */
  router.put('/:id', function(req, res, next) {
    Institution.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
  /* DELETE BOOK */
  router.delete('/:id', function(req, res, next) {
    Institution.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

module.exports = router;
