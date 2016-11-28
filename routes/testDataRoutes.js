/**
 * Created by Dhruvraj on 11/20/2016.
 */
var express = require('express');
var router = express.Router();
var testDataController=require("../controllers/testData.controller.js")
var parseXML=require("../controllers/parseXML.controller.js")

module.exports = function(app){
    app.get('/testDataMainPage',testDataController.renderHome);
    app.post('/testProcessForm',testDataController.processForm);
    app.get('/testDataOCSC&Efficiency',testDataController.renderOCSC);
    app.get('/testDataVisualInspection',testDataController.renderVisual);
    app.get('/testDataOCSCFileUpload',testDataController.renderOCSCFile);
    app.get('/testDataVisualFileUpload',testDataController.renderVisualFile);
    app.post('/processOCSC',testDataController.processOCSC);
    app.post('/processVisual',testDataController.processVisual);
    app.get('/addTestFile',testDataController.renderFile);
    app.get('/XMLFileError',parseXML.renderError);
    app.post('/fileUploadTest',parseXML.parseTestFile);
    app.post('/fileUploadOCSC',parseXML.parseSpTest1);
    app.post('/fileUploadVisual',parseXML.parseSpTest2);
};