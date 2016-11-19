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

exports.renderSuccess= function(req,res){
    res.render('success');
};



exports.processForm = function(req,res){
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
                console.log("signup successful"+JSON.stringify(success));
                return res.redirect("/success");
            });
};
