/**
 * Created by saura on 11/19/2016.
 */

var express = require('express');
var router = express.Router();
var solarSystemInfocontroller=require("../controllers/solarSystemInfo.controller.js");

module.exports = function(app){
    app.post('/solarSystemInfoResults', solarSystemInfocontroller.printResults);
    app.get('/solarSystemMonitoringResults', solarSystemInfocontroller.printMonitoringResults);
    app.post('/solarSystemCompareResults', solarSystemInfocontroller.printMonitoringCompareResults);
};
