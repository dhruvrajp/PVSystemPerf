/**
 * Created by saurabh on 11/18/2016.
 */
var sequelize=require("../config/sequelize").getSequelize;
var bodyParser = require('body-parser');

'use strict';
var sess;
exports.renderHome = function(req, res) {
    sess=req.session;
    if (sess.email) {
        console.log("Home request");
        res.render('addCerti');
    }else{
    res.render('loginRegPage');
}
};

exports.addNewCertiDataForm = function(req,res){
    sess = req.session;
    if (sess.email){
        res.render('addNewCertiDataForm');
    }else{
        res.render('loginRegPage');
    }
};

exports.addNewCertiAttemptForm = function(req,res){
    sess = req.session;
    if (sess.email) {
        res.render('addNewCertiAttemptForm');
    }else{
        res.render('loginRegPage');
    }
};

exports.processCertiAttemptForm = function(req,res){
   // console.log("Inside Post" + String(Object.keys(req.body)));
   // console.log("Inside Post" + String(Object.keys(req)));
    //res.render('');
    sess = req.session;
    if (sess.email) {
        var attemptid = req.body.attemptid;
        var systemid = req.body.systemid;
        var certificateid = req.body.certificateid;
        var day = req.body.day;
        var month = req.body.month;
        var year = req.body.year;
        var attemptstatus = req.body.attemptstatus;
        var comments = req.body.comments;
        var certify = req.body.certify;
        var attemptdate = String(year) + '-' + String(month) + '-' + String(day);
        console.log(String(attemptid) + " " + String(systemid) + " " + String(certificateid) + " " + attemptdate + " " + String(day) + " " + String(month) + " " + String(year) + " " + String(attemptstatus) + "Comments:" + String(comments) + String(certify));
        if (attemptid == null || attemptid == "" || comments == null || comments == "" || certify == null || certify == "") {
            return res.render("certiFailure");
        }
        else {


            var query = "insert into certificateattempt (attemptid, systemid, certificateid, attemptdate , attemptstatus , comments) values (:attemptid, :systemid, :certificateid, :attemptdate, :attemptstatus, :comments)";
            sequelize.query(query, {
                    replacements: {
                        attemptid: attemptid,
                        systemid: systemid,
                        certificateid: certificateid,
                        attemptdate: attemptdate,
                        attemptstatus: attemptstatus,
                        comments: comments
                    }
                })
                .then(function (success) {
                    console.log("insert into certificate attempt successful " + JSON.stringify(success));
                    return res.render("certiSuccess");
                });

        }
    }else{
        res.render('loginRegPage');
    }
};

exports.processCertiDataForm = function(req,res){
    sess = req.session;

    console.log("Inside PostCerti Data");
    //res.render('');
    if (sess.email){
    var certificatenumber = req.body.certificatenumber
    var attemptid = req.body.attemptid;
    var systemid = req.body.systemid;
    var certificateid = req.body.certificateid;
    var day = req.body.day;
    var month = req.body.month;
    var year = req.body.year;
    var validday = req.body.day;
    var validmonth = req.body.month;
    var validyear = req.body.year;
    var certify = req.body.certify;
    var attemptdate = String(year) +'-' + String(month) + '-' + String(day);
    var validdate = String(validyear) + '-' + String(validmonth) + '-' + String(validyear);
   // console.log(String(attemptid) + " " + String(systemid) + " " + String(certificateid) + " "+attemptdate +" " + String(day) + " " + String(month) + " " + String(year) + " " + String(attemptstatus) + "Comments:"+ String(comments) + String(certify));
    if (certificatenumber == null || certificatenumber == "" || certify == null || certify =="" )
    {
        return res.render("certiFailure")
    }
    else {
        var query = "insert into certificates (certificateid, attemptid, systemid, certificatetypeid, dateeffectivefrom , expirydate) values (:certificatenumber, :attemptid, :systemid, :certificateid, :attemptdate, :validdate)";
        sequelize.query(query, {
                replacements: {
                    certificatenumber: certificatenumber,
                    attemptid: attemptid,
                    systemid: systemid,
                    certificateid: certificateid,
                    attemptdate: attemptdate,
                    validdate: validdate
                }
            })
            .then(function (success) {
                console.log("insert into certificate attempt successful " + JSON.stringify(success));
                return res.render("certiSuccess");
            });
    }
    }else{
        res.render('loginRegPage');
    }
};