/**
 * Created by Dhruvraj on 11/16/2016.
 */
var sequelize=require("../config/sequelize").getSequelize;

'use strict';

var sess;
exports.renderHome = function(req, res) {
    sess=req.session;
    if(sess.email) {
        console.log("This email"+req.session.email);
        res.render('addPv');
    }else{
        res.render('loginRegPage');
    }
};

exports.renderForm = function(req,res){
    sess=req.session;
    if(sess.email) {
        res.render('addPvForm');
    }else{
        res.render('loginRegPage');
    }
};

exports.renderFile = function(req,res){
    sess=req.session;
    if(sess.email) {
         res.render('addPvFile');
    }else{
         res.render('loginRegPage');
    }
};

exports.renderSuccess= function(req,res){
    sess=req.session;
    if(sess.email) {
        res.render('success');
    }else{
        res.render('loginRegPage');
    }
};



exports.processForm = function(req,res){
    sess=req.session;
    if(sess.email) {
    console.log("Inside Post");
    console.log('inside server controller signup' + JSON.stringify(req.body))
    var location=req.body.location;
    var site=req.body.site;
    var manufacturer=req.body.manufacturer;
    var manufacturermodeldesignation=req.body.manufacturermodeldesignation;
    var technology= req.body.technology;
    var fixedtilttracking=req.body.fixedtilttracking;
    var construction=req.body.construction;
    var numberofmodulesinthesystem=req.body.numberofmodules;
    var exposedyearsatthetimeofevaluation=req.body.exposedyearsatthetimeofevaluation;
    var evaluationyear=req.body.evaluationyear;

    var query = "insert into solarsystems (location,site,manufacturer,manufacturermodeldesignation,technology,fixedtilttracking,construction,numberofmodulesinthesystem,exposedyearsatthetimeofevaluation,evaluationyear) values (:location,:site,:manufacturer,:manufacturermodeldesignation,:technology,:fixedtilttracking,:construction,:numberofmodulesinthesystem,:exposedyearsatthetimeofevaluation,:evaluationyear)";
        sequelize.query(query,{ replacements: {location:location,site:site,manufacturer:manufacturer,manufacturermodeldesignation:manufacturermodeldesignation,technology:technology,fixedtilttracking:fixedtilttracking,construction:construction,numberofmodulesinthesystem:numberofmodulesinthesystem,exposedyearsatthetimeofevaluation:exposedyearsatthetimeofevaluation,evaluationyear:evaluationyear}})
            .then(function(success) {
                if(success) {
                    console.log("signup successful" + JSON.stringify(success));
                    return res.redirect("/success");
                }else{
                    res.render("authError");
                }
            });
    }else{
        res.render('loginRegPage');
    }
};
