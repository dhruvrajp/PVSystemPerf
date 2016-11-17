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


exports.insertData = function(req,res){
    console.log("Inside Post");
    var  email = req.body.email,
        password = req.body.password,
        firstname = req.body.firstname,
        lastname = req.body.lastname,
        role_id = req.body.role_id

};