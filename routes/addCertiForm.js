/**
 * Created by saura on 11/18/2016.
 */

var express = require('express');
var router = express.Router();
var addCerticontroller=require("../controllers/addCerti.controller.js");

module.exports = function(app){

    app.get('/addNewCertiData',addCerticontroller.addNewCertiDataForm);
    app.get('/addNewCertiAttempt',addCerticontroller.addNewCertiAttemptForm);
    app.post('/processCertiDataForm',addCerticontroller.processCertiDataForm);
    app.post('/processCertiAttemptForm',addCerticontroller.processCertiAttemptForm);
};