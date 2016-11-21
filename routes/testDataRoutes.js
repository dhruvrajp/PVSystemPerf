/**
 * Created by Dhruvraj on 11/20/2016.
 */
var express = require('express');
var router = express.Router();
var testDataController=require("../controllers/testData.controller.js");

module.exports = function(app){
    app.get('/testDataMainPage',testDataController.renderHome);
    app.post('/testProcessForm',testDataController.processForm);
    app.get('/testDataOCSC&Efficiency',testDataController.renderOCSC);
    app.get('/testDataVisualInspection',testDataController.renderOCSC);
    app.post('/processOCSC',testDataController.processOCSC);
    app.post('/processVisual',testDataController.processVisual);
};