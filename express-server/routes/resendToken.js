var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');
var Token = require('../models/Token.js');
var crypto = require('crypto');
const { check, validationResult } = require('express-validator/check');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

/* POST /resend */
router.post('/', [
    check('email')
      // Every validator method in the validator lib is available as a
      // method in the check() APIs.
      // You can customize per validator messages with .withMessage()
      .isEmail().withMessage('Email is not valid')
   
      // Every sanitizer method in the validator lib is available as well!
      .trim()
      .normalizeEmail(),
    ], (req, res, next) => {
    // Get the validation result whenever you want; see the Validation Result API for all options!
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.mapped() });
    }

    // Make sure this account does exist
    User.findOne({ email: req.body.email }, function (err, user) {
  
        // Make sure user does already exist
        if (!user) return res.status(400).send({ msg: 'We were unable to find a user with that email.' });

        // Make sure user has not been verified
        if (user.isVerified) return res.status(400).send({ msg: 'This account has already been verified. Please log in.' });

    
        // Create a verification token for this user
        var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
    
        // Save the verification token
        token.save(function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
    
            // Send the email
            const msg = {
                to: user.email,
                from: 'no-reply@fyp.com',
                subject: 'Account Verification',
                html: 'Hello ' + user.username + ',<br><br>' + 
                'Thank you again for signing up to our website. We just need to verify your email address to complete your signup process and activate your account.<br><br>' + 
                'Please verify your account by clicking the button below:<br><br>' +
                '<table style="margin: 0px auto;"><tr><td style="background-color: #4ecdc4;border-color: #4c5764;border: 2px solid #45b7af;border-radius: 5px;padding: 10px;text-align: center;">' +
                '<a style="display: block;color: #ffffff;font-size: 12px;text-decoration: none;text-transform: uppercase;" ' +
                'href="http://' + req.headers.host + '/confirmation/' + token.token + '">Activate Now</a></td></tr></table><br><br>' +
                'Here is the link if you cannot see the button:' + '<br>' +
                '<a href="http://' + req.headers.host + '/confirmation/' + token.token + '">http://' + req.headers.host + '/confirmation/' + token.token + 
                '</a><br><br>' +
                'Best,' + '<br>' + 
                'Course Selection Advisor',
            };
            sgMail.send(msg, function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.status(200).json(user);
            });
        });
    });
});

module.exports = router;
