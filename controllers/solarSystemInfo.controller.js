/**
 * Created by saura on 11/18/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;
var sess;
exports.printResults = function(req, res){
    /*
     var email = req.body.username;
     var pass = req.body.password;
     //console.log("Inside Login User Emaol= "+ String(email) +"" + String(pass));

     var query = "SELECT Email, password FROM solarsystemowners WHERE Email= :email";
     sequelize.query(query, {replacements: {email : email} ,type : sequelize.QueryTypes.SELECT}
     ).then(function(val){

     */
    sess = req.session;
    if (sess.email){
        var systemcode = req.body.systemcode;
        sess.syscode = systemcode;
        console.log("System code"+String(sess.syscode));
        var query = "SELECT * FROM solarsystems WHERE systemcode = :systemcode";
        sequelize.query(query, {replacements: {systemcode: systemcode}, type : sequelize.QueryTypes.SELECT}
        ).then(function(val){
            //var x;
            //for (x in val.keys())
            console.log(val);
            var myobj ='{"vals":'+JSON.stringify(val)+'}';
            res.render('solarSystemInfoResults',JSON.parse(myobj));

        });
    }else{
        res.render('loginRegPage');
    }
    //res.render('solarSystemInfoResults');
};

exports.renderHome = function(req, res) {
    sess = req.session;
    if(sess.email){
        var query = "SELECT systemcode FROM solarsystems";
        sequelize.query(query, {type : sequelize.QueryTypes.SELECT}
        ).then(function(val){
            //var x;
           //for (x in val.keys())
            //console.log("Inside for");
            var myobj ='{"vals":'+JSON.stringify(val)+'}';
            console.log(myobj);
            res.render('solarSystemInfo',JSON.parse(myobj));
        });
    }else{
        res.render('loginRegPage');
    }

};

exports.printMonitoringResults = function(req, res){
    /*
     var email = req.body.username;
     var pass = req.body.password;
     //console.log("Inside Login User Emaol= "+ String(email) +"" + String(pass));

     var query = "SELECT Email, password FROM solarsystemowners WHERE Email= :email";
     sequelize.query(query, {replacements: {email : email} ,type : sequelize.QueryTypes.SELECT}
     ).then(function(val){

     */
    sess = req.session;
    if (sess.email){
        var systemcode = sess.syscode;
        var query = "SELECT monthYear, PredictedPower, ActualPower FROM monitoringdatayearly WHERE systemcode = :systemcode";
        sequelize.query(query, {replacements: {systemcode: systemcode}, type : sequelize.QueryTypes.SELECT}
        ).then(function(val){
            //var x;
            //for (x in val.keys())
            console.log(val);
            var myobj ='{"vals":'+JSON.stringify(val)+'}';
            res.render('solarSystemMonitoringResults',JSON.parse(myobj));

        });
    }else{
        res.render('loginRegPage');
    }
    //res.render('solarSystemInfoResults');
};
