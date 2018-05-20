var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var crypto = require('crypto');
const { check, validationResult } = require('express-validator/check');

/* POST /login */
router.post('/', [
    check('username', 'Username cannot be blank').exists(),
    
    // General error messages can be given as a 2nd argument in the check APIs
    check('password', 'Passwords must be at least 5 chars long and contain one number')
      .isLength({ min: 5 })
      .matches(/\d/)

  ], (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // Make sure this account doesn't already exist
    User.findOne({ username: req.body.username, password: req.body.password }, function (err, user) {
  
        // Make sure user doesn't already exist
        if (!user) return res.status(400).send({ msg: 'The username and password you have entered is incorrect. Please try again.' });

        // Verify and save the user
        user.isLogin = true;
        user.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
            res.status(200).send(user);
        });
    });
});

router.put('/:id', function(req, res, next) {
    User.findOne({ _id:req.params.id}, function (err, user) {
      // Make sure user doesn't already exist
      if (!user) return res.status(400).send({ msg: 'The username and password you have entered is incorrect. Please try again.' });

      // Verify and save the user
      user.isLogin = false;
      user.save(function (err) {
          if (err) { return res.status(500).send({ msg: err.message }); }
          res.status(200).send(user);
      });
    });
});


module.exports = router;
