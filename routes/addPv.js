/**
 * Created by Dhruvraj on 11/17/2016.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var addPvcontroller=require("../controllers/addPv.controller.js");
var parseXML=require("../controllers/parseXML.controller.js");

module.exports = function(app){

    app.get('/addPvForm',addPvcontroller.renderForm);
    app.get('/addPvFile',addPvcontroller.renderFile);
    app.post('/processPvForm',addPvcontroller.processForm);
    app.get('/success',addPvcontroller.renderSuccess);
    app.get('/addPv',addPvcontroller.renderHome);
    app.post('/addPv',addPvcontroller.renderHome);
    app.post('/fileUploadPV', parseXML.parsePVFile );
};