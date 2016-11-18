/**
 * Created by Dhruvraj on 11/16/2016.
 */
var sequelize=require("../config/sequelize").getSequelize;

'use strict';

exports.renderHome = function(req, res) {
    res.render('addPv');
};

exports.renderForm = function(req,res){
    res.render('addPvForm');
};

exports.renderFile = function(req,res){
    res.render('addPvFile');
};


exports.processForm = function(req,res){
    console.log("Inside Post");
    res.render('addPv');
};