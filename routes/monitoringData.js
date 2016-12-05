/**
 * Created by Dhruvraj on 12/4/2016.
 */
var express = require('express');
var router = express.Router();
var monitoringDataController=require("../controllers/monitoringData.controller.js")
var parseXML=require("../controllers/parseXML.controller.js")

module.exports = function(app){
    app.get('/monitoringDisplay',monitoringDataController.renderHome);
    app.post('/processMonitoringData',monitoringDataController.processMonitoring);
};