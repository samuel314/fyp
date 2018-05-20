var express = require('express');
var router = express.Router();
var phantomjs = require('phantomjs-prebuilt');
var mongoose = require('mongoose');
var User = require('../models/User.js');
var CourseHistory = require('../models/CourseHistory.js');
var async = require('async');

/* GET ALL COURSE HISTORY */
router.get('/', function(req, res, next) {
  CourseHistory.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', function(req, res, next) {
    CourseHistory.find({_userId:req.params.id},function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

// Course History Scrape
router.get('/scrape/ch', function (req, res) {
    var program = phantomjs.exec('courseHistoryScrape.js','ysschanaa','kelefe314');
    program.stdout.pipe(process.stdout);
    program.stderr.pipe(process.stderr);
    program.stdout.on('data', function (data) {
        var buff = new Buffer(data).toString();
        var result  = JSON.parse(buff);
        User.findOne({ email: "ysschanaa@connect.ust.hk" }, function (err, user) {
            async.forEach(result.results[0], function forAllCourses(key, callback) {
                CourseHistory.findOne({ course: key.Course, description: key.Description, term: key.Term }, function (err, history){
                    if (history) {
                        if (history.grade !== key.Grade && history.status !== key.Status) {
                            history.grade = key.Grade;
                            history.status = key.Status;
                            history.save(function (err) {
                                if (err) { return res.status(500).send({ msg: err.message }); }
                            });
                        }
                    } else {
                        history = new CourseHistory({ _userId: user._id, course: key.Course, description: key.Description,
                            term: key.Term, grade: key.Grade, units: key.Units,
                            status: key.Status });
                        history.save(function (err) {
                            if (err) { return res.status(500).send({ msg: err.message }); }
                        });
                    }
                    callback();
                });
            });
        });
    });
    program.on('exit', code => {
        res.status(200).send("Successfully retrieved course history.");
    });
});

module.exports = router;