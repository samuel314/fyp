var express = require('express');
var router = express.Router();
var request = require('request'); // for web-scraping
var cheerio = require('cheerio'); // for web-scraping
var async = require('async');
var CreditTransfer = require('../models/CreditTransfer.js');
var Institution = require('../models/Institution.js');
var Exam = require('../models/Exam.js');
var ExamTransfer = require('../models/ExamTransfer.js');

// Index Page Render (first visit to the site)
router.get('/', function (req, res) {

    // Scrape data
    res.redirect('/scrape/code/local');
  
});

var localCodes = [];
// Local Institutions Code scrape
router.get('/code/local', function (req, res) {
    // Crawl local school codes
    localCodes = [];
    var url = "http://arr.ust.hk/ust_actoe/credit_local.php";
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('#selI').children().each(function (i, item) {
            if (i > 0) {
                var code = $(item).val();
                localCodes.push(code);
            }
        });  
    });
    res.redirect('/scrape/local');
});

// Local Institutions scrape
router.get('/local', function (req, res) {
    var localWebsite = "http://arr.ust.hk/ust_actoe/credit_local.php?selI=";
    var localParameter = "&txtK=&search=y&btn1=+Search+#myform";
    var institutionsArray = [];
    // Crawl local school credit details
    localCodes.forEach(function(localCode, index) {
        var url = localWebsite + localCode + localParameter;
        var school = {};
        async.whilst(
            function(){
            return url.length != 0;
            },
            function(next){
            request(url, (function(index) { return function(err, resp, body) {
                if (err)
                throw err;
                $ = cheerio.load(body);
                var institution;
                $('.table_title').parent().find('tr').each(function (i, item) {
                    var json = {};
                    if (i==0) {
                        school.id = localCode;
                        institution = $(item).find('div.brown').text();
                        school.type = "Local";
                        school.name = institution;
                        school.location = "Hong Kong";
                        // Error handling to ensure there are no empty scrapes
                        if (Object.keys(school).length != 0) {

                            // Due to async, moongoose will not save the institutions fast enough for the duplicates within a scrape to be caught
                            if(institutionsArray.indexOf(school.name) == -1) {

                                // Push the saved item to our institutionsArray to prevent duplicates 
                                institutionsArray.push(school.name);

                                // Only add the entry to the database if is not already there
                                Institution.count( { $and: [ { id: school.id }, { name: school.name } ] }, function (err, test){
                    
                                    // If the count is 0, then the entry is unique and should be saved
                                    if(test == 0){
                    
                                        // Using the Institution model, create a new entry (note that the "school" object has the exact same key-value pairs of the model)
                                        var entry = new Institution (school);
                    
                                        // Save the entry to MongoDB
                                        entry.save(function(err, doc) {
                                            // log any errors
                                            if (err) {
                                            console.log(err);
                                            } 
                                            // or log the doc that was saved to the DB
                                            else {
                                            console.log(doc);
                                            }
                                        });
                                    }
                                    // Log that scrape is working, just the content was already in the Database
                                    else{
                                        console.log('Redundant Database Content. Not saved to DB.')
                                    }
                                });
                            }
                            // Log that scrape is working, just the content was missing parts
                            else{
                                console.log('Redundant Database Content. Not Saved to DB.')
                            }
                        }
                        // Log that scrape is working, just the content was missing parts
                        else{
                            console.log('Empty Content. Not Saved to DB.')
                        }
                    }
                    if (i >= 2 && $(item).find('td').eq(0).text() !== "No record(s) found.") {
                        json.id = localCode;
                        json.institution = institution;
                        json.subject = $(item).find('td').eq(0).text().trim();
                        json.courseCode = $(item).find('td').eq(1).text().trim();
                        json.transferCourseCode = $(item).find('td').eq(2).text();
                        json.credits = $(item).find('td').eq(3).text();
                        json.restriction = $(item).find('td').eq(4).text();
                        json.validUntil = $(item).find('td').eq(5).text();
                        json.dbReferenceNo = $(item).find('td').eq(6).text().trim();

                        // Error handling to ensure there are no empty scrapes
                        if (Object.keys(json).length != 0) {

                            // Only add the entry to the database if is not already there
                            CreditTransfer.count( { $and: [ { institution: json.institution }, { dbReferenceNo: json.dbReferenceNo } ] }, function (err, test) {
                
                                // If the count is 0, then the entry is unique and should be saved
                                if(test == 0){
                
                                    // Using the CreditTransfer model, create a new entry (note that the "json" object has the exact same key-value pairs of the model)
                                    var entry = new CreditTransfer (json);
                
                                    // Save the entry to MongoDB
                                    entry.save(function(err, doc) {
                                        // log any errors
                                        if (err) {
                                        console.log(err);
                                        } 
                                        // or log the doc that was saved to the DB
                                        else {
                                        console.log(doc);
                                        }
                                    });
                
                                }
                                // Log that scrape is working, just the content was already in the Database
                                else{
                                    console.log('Redundant Database Content. Not saved to DB.')
                                }
                
                            });
                        }
                        // Log that scrape is working, just the content was missing parts
                        else{
                            console.log('Empty Content. Not Saved to DB.')
                        }
                    }
                });
                if ($('a:contains("Next")').attr('href') !== undefined) {
                    url = "http://arr.ust.hk" + $('a:contains("Next")').attr('href');
                }
                else {
                    url = "";
                }
                next();
            }})(index));  
            }
        );
        if (index == localCodes.length-1) {
            res.redirect('/scrape/location/non-local');
        }
    }); 
});

var examCodes = [];
// Exam Codes scrape
router.get('/code/exam', function (req, res) {
    // Crawl exam codes
    examCodes = [];
    var url = "http://arr.ust.hk/ust_actoe/credit_exam.php";
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('#selI').children().each(function (i, item) {
            if (i > 0) {
                var code = $(item).val();
                examCodes.push(code);
            }
        });
    });
    res.redirect('/scrape/exam');
});

// Exams scrape
router.get('/exam', function (req, res) {
    var examWebsite = "http://arr.ust.hk/ust_actoe/credit_exam.php?selI=";
	var examParameter = "&search=y#myform";
    // Crawl exam credit details
    examCodes.forEach(function(examCode, index) {
        var url = examWebsite + examCode + examParameter;
        var exam = {};
        request(url, (function(index) { return function(err, resp, body) {
            if (err)
                throw err;
            $ = cheerio.load(body);
            var examName;
            exam.id = examCode;
            var temp = $('div.brown');
            examName = temp.text();
            exam.gradeScale = temp.next().text();
            exam.name = examName;
            // Error handling to ensure there are no empty scrapes
            if (Object.keys(exam).length != 0) {

                // Only add the entry to the database if is not already there
                Exam.count( { $and: [ { id: exam.id }, { name: exam.name } ] }, function (err, test){
            
                    // If the count is 0, then the entry is unique and should be saved
                    if (test == 0) {
            
                        // Using the Exam model, create a new entry (note that the "exam" object has the exact same key-value pairs of the model)
                        var entry = new Exam (exam);
            
                        // Save the entry to MongoDB
                        entry.save(function(err, doc) {
                            // log any errors
                            if (err) {
                                console.log(err);
                            } 
                            // or log the doc that was saved to the DB
                            else {
                                console.log(doc);
                            }
                        });
                    }
                     // Log that scrape is working, just the content was already in the Database
                    else {
                        console.log('Redundant Database Content. Not saved to DB.')
                    }
                });
            }
            // Log that scrape is working, just the content was missing parts
            else {
                console.log('Empty Content. Not Saved to DB.')
            }
            $('.table_title').parent().find('tr').each(function (i, item) {
                var json = {};
                if (i >= 1 && $(item).find('td').eq(0).text() !== "No record(s) found.") {
                    json.id = examCode;
                    json.exam = examName;
                    json.subject = $(item).find('td').eq(0).text();
                    json.minGrade = $(item).find('td').eq(1).text();
                    json.transferCourseCode = $(item).find('td').eq(2).text();
                    json.credits = $(item).find('td').eq(3).text();
                    json.validUntil = $(item).find('td').eq(4).text();
                    json.dbReferenceNo = $(item).find('td').eq(5).text();

                    // Error handling to ensure there are no empty scrapes
                    if (Object.keys(json).length != 0) {

                        // Only add the entry to the database if is not already there
                        ExamTransfer.count( { $and: [ { exam: json.exam }, { dbReferenceNo: json.dbReferenceNo } ] }, function (err, test) {
                
                            // If the count is 0, then the entry is unique and should be saved
                            if (test == 0){
                
                                // Using the ExamTransfer model, create a new entry (note that the "json" object has the exact same key-value pairs of the model)
                                var entry = new ExamTransfer (json);
                
                                // Save the entry to MongoDB
                                entry.save(function(err, doc) {
                                    // log any errors
                                    if (err) {
                                        console.log(err);
                                    } 
                                    // or log the doc that was saved to the DB
                                    else {
                                        console.log(doc);
                                    }
                                });
                            }
                            // Log that scrape is working, just the content was already in the Database
                            else {
                                console.log('Redundant Database Content. Not saved to DB.')
                            }
                        });
                    }
                    // Log that scrape is working, just the content was missing parts
                    else {
                        console.log('Empty Content. Not Saved to DB.')
                    }
                }
            });
        }})(index));  
    }); 
    res.status(200).send('Done scraping');
    res.end();
    return;
});

var nonLocalLocations = [];
// Non-Local Institution locations scrape
router.get('/location/non-local', function (req, res) {
    // Crawl non-local institution locations
    var url = "http://arr.ust.hk/ust_actoe/credit_overseas.php";
    nonLocalLocations = [];
    request(url, function(err, resp, body) {
        if (err)
            throw err;
        $ = cheerio.load(body);
        $('#selCty').children().each(function (i, item) {
            if (i > 1) {
                var loc = $(item).val();
                if (loc === "Korea, Republic of") {
                    loc = "Korea%2C+Republic+of";
                }
                else {
                    loc = loc.replace(" ", "+");
                }
                nonLocalLocations.push(loc);
            }
        });
        res.redirect('/scrape/code/non-local');
    });
    
});

var nonLocalCodes = [];
// Non-Local Institution codes scrape
router.get('/code/non-local', function (req, res) {
    // Crawl non-local institution locations
    var nonLocalWebsite = "http://arr.ust.hk/ust_actoe/credit_overseas.php?selCty=";
    var nonLocalParameter = "&selI=&txtK=&search=y&btn1=+Search+#myform";
    nonLocalCodes = [];
    nonLocalLocations.forEach(function(nonLocalLocation, index) {
        var url = nonLocalWebsite + nonLocalLocation + nonLocalParameter;
        var tempCodes = [];
        request(url, (function(index) { return function(err, resp, body) {
            if (err)
                throw err;
            $ = cheerio.load(body);
            $('#selI').children().each(function (i, item) {
                if (i > 0) {
                    var code = $(item).val();
                    tempCodes.push(code);
                }
            });
            nonLocalCodes[index] = tempCodes;
        }})(index));
        if (index == nonLocalLocations.length-1) {
            
            res.redirect('/scrape/code/exam');
        }
    });
});

// Non-Local Institutions scrape
router.get('/non-local', function (req, res) {
    var nonLocalWebsite = "http://arr.ust.hk/ust_actoe/credit_overseas.php?selCty=";
	var nonLocalParameter1 = "&selI=";
	var nonLocalParameter2 = "&txtK=&search=y&btn1=+Search+#myform";
    var institutionsArray = [];
    // Crawl non local school credit details
    nonLocalLocations.forEach(function(nonLocalLocation, index) {
        nonLocalCodes[index].forEach(function(nonLocalCode, j) {
            var url = nonLocalWebsite + nonLocalLocation + nonLocalParameter1 + nonLocalCode + nonLocalParameter2;
            var school = {};
            async.whilst(
                function(){
                return url.length != 0;
                },
                function(next){
                request(url, (function(index) { return function(err, resp, body) {
                    if (err)
                    throw err;
                    $ = cheerio.load(body);
                    var institution;
                    $('.table_title').parent().find('tr').each(function (i, item) {
                        var json = {};
                        if (i==0) {
                            school.id = nonLocalCode;
                            institution = $(item).find('div.brown').text();
                            school.type = "Non-Local";
                            school.name = institution;
                            if (nonLocalLocation === "Korea%2C+Republic+of") {
                                school.location = "Republic of Korea";
                            }
                            else {
                                school.location = nonLocalLocation.replace("+", " ");
                            }
                            // Error handling to ensure there are no empty scrapes
                            if (Object.keys(school).length != 0) {
    
                                // Due to async, moongoose will not save the institutions fast enough for the duplicates within a scrape to be caught
                                if(institutionsArray.indexOf(school.name) == -1) {
    
                                    // Push the saved item to our institutionsArray to prevent duplicates 
                                    institutionsArray.push(school.name);
    
                                    // Only add the entry to the database if is not already there
                                    Institution.count( { $and: [ { id: school.id }, { name: school.name } ] }, function (err, test){
                        
                                        // If the count is 0, then the entry is unique and should be saved
                                        if(test == 0){
                        
                                            // Using the Institution model, create a new entry (note that the "school" object has the exact same key-value pairs of the model)
                                            var entry = new Institution (school);
                        
                                            // Save the entry to MongoDB
                                            entry.save(function(err, doc) {
                                                // log any errors
                                                if (err) {
                                                console.log(err);
                                                } 
                                                // or log the doc that was saved to the DB
                                                else {
                                                console.log(doc);
                                                }
                                            });
                                        }
                                        // Log that scrape is working, just the content was already in the Database
                                        else{
                                            console.log('Redundant Database Content. Not saved to DB.')
                                        }
                                    });
                                }
                                // Log that scrape is working, just the content was missing parts
                                else{
                                    console.log('Redundant Database Content. Not Saved to DB.')
                                }
                            }
                            // Log that scrape is working, just the content was missing parts
                            else{
                                console.log('Empty Content. Not Saved to DB.')
                            }
                        }
                        if (i >= 2 && $(item).find('td').eq(0).text() !== "No record(s) found.") {
                            json.id = nonLocalCode;
                            json.institution = institution;
                            json.subject = $(item).find('td').eq(0).text().trim();
                            json.courseCode = $(item).find('td').eq(1).text().trim();
                            json.transferCourseCode = $(item).find('td').eq(2).text();
                            json.credits = $(item).find('td').eq(3).text();
                            json.restriction = $(item).find('td').eq(4).text();
                            json.validUntil = $(item).find('td').eq(5).text();
                            json.dbReferenceNo = $(item).find('td').eq(6).text().trim();
    
                            // Error handling to ensure there are no empty scrapes
                            if (Object.keys(json).length != 0) {
    
                                // Only add the entry to the database if is not already there
                                CreditTransfer.count( { $and: [ { institution: json.institution }, { dbReferenceNo: json.dbReferenceNo } ] }, function (err, test) {
                    
                                    // If the count is 0, then the entry is unique and should be saved
                                    if(test == 0){
                    
                                        // Using the CreditTransfer model, create a new entry (note that the "json" object has the exact same key-value pairs of the model)
                                        var entry = new CreditTransfer (json);
                    
                                        // Save the entry to MongoDB
                                        entry.save(function(err, doc) {
                                            // log any errors
                                            if (err) {
                                            console.log(err);
                                            } 
                                            // or log the doc that was saved to the DB
                                            else {
                                            console.log(doc);
                                            }
                                        });
                    
                                    }
                                    // Log that scrape is working, just the content was already in the Database
                                    else{
                                        console.log('Redundant Database Content. Not saved to DB.')
                                    }
                    
                                });
                            }
                            // Log that scrape is working, just the content was missing parts
                            else{
                                console.log('Empty Content. Not Saved to DB.')
                            }
                        }
                    });
                    if ($('a:contains("Next")').attr('href') !== undefined) {
                        url = "http://arr.ust.hk" + $('a:contains("Next")').attr('href');
                        url = url.replace(/ /g, "%20");
                    }
                    else {
                        url = "";
                    }
                    next();
                }})(index));  
                }
            );
        });
        if (index == nonLocalCodes.length-1) {
            return res.status(200).end("Done Scraping");
        }
    }); 
});

module.exports = router;
