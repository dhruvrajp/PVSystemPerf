/**
 * Created by Dhruvraj on 11/17/2016.
 */
var express = require('express');
var router = express.Router();
var loginRegcontroller=require("../controllers/loginReg.controller.js");

module.exports = function(app){

    app.get('/loginRegPage',loginRegcontroller.renderMain);
    app.get('/registerSolarSystemOwner',loginRegcontroller.renderRegSolSysOwner);
    app.post('/addSolSysOwner',loginRegcontroller.addSolSysOwner)
};