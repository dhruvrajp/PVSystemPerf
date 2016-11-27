/**
 * Created by saura on 11/27/2016.
 */
var express = require('express');
var router = express.Router();
var failureModescontroller=require("../controllers/failureModes.controller.js");

module.exports = function(app){
    app.post('/failureModesResults', failureModescontroller.printResults);
};
