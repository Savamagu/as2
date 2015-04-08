// Dependencies
var express = require('express');
var router = express.Router();

// Database
var mongoose = require('mongoose');
var Printer = require('../models/printer');

//
//
// READ
//
//

// Get the list of all the printing businesses
router.get('/printers', function (req, res, next) {

    // If else statament checking for errors
    Printer.find(function (err, printers) {
        if (err) {
            res.render('error', { error: err });
        }
        else {
            res.render('printers', { printers: printers });
            console.log(printers);
        }
    });
});

//
//
// CREATE
//
//

// Getting printers/add page
router.get('/printers/add', function(req, res, next) {
    res.render('add');
});

// Posting to printers/add
router.post('/printers/add', function (req, res, next) {

    // Inserting a new business
    Printer.create({
        Name: req.body.Name,
        Logo: req.body.Logo,
        Address: req.body.Address,
        Country: req.body.Country,
        Telephone: req.body.Telephone,
        Email: req.body.Email
    }, function (err, Printer) {
        if (err) {
            console.log(err);
            res.render('error', { error: err }) ;
        }
        else {
            console.log('The new business was saved. ' + Printer + '.');
            res.render('added', { printer: Printer.Name });
        }
    });
});

//
//
// UPDATE
//
//

// Getting printers/edit/:id page 
router.get('/printers/edit/:id', function (req, res, next) {
    
    // Variable for the id taken from the url
    var id = req.params.id;

    // Find the business 
    Printer.findById(id, function (err, printer) {
        if (err) {
            res.send('Business ' + id + ' not found');
        }
        else {
            // 'jade template' { variable: model }
            res.render('edit', { printer: printer });
        }
    });
});

// Posting/editing existing business that was selected
router.post('/printers/edit/:id', function (req, res, next) {
    var id = req.body.id;

    var printer = {
        _id: req.body.id,
        Name: req.body.Name,
        Logo: req.body.Logo,
        Address: req.body.Address,
        Country: req.body.Country,
        Telephone: req.body.Telephone,
        Email: req.body.Email
    };

    Printer.update({ _id: id}, printer, function(err) {
        if (err) {
            res.send('Business ' + req.body.id + ' not updated. Error: ' + err);
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/printers');
            res.end();
        }
    });
});

//
//
// DELETE
//
//

// Deleting a business by id
router.get('/printers/delete/:id', function (req, res, next) {
    
    // Variable for the id taken from the url
    var id = req.params.id;

    // Find the business and delete it
    Printer.remove({ _id: id }, function (err, printer) {
        if (err) {
            res.send('Printer ' + id + ' does not exist');
        }
        else {
            res.statusCode = 302;
            res.setHeader('Location', 'http://' + req.headers['host'] + '/printers');
            res.end();
        }
    });
});

//
//
// API
//
//

// Creating API to display businesses in JSON
router.get('/api/printers', function (req, res, next) {
    Printer.find(function(err, printers) {
        if (err) {
            res.send(err);
        } 
        else {
            res.send(printers);
        }
    });
});


module.exports = router;







