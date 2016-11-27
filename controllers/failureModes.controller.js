/**
 * Created by saura on 11/27/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;
var sess;


exports.renderHome = function(req, res) {
    sess = req.session;
    if(sess.email){
        var query = "SELECT climatetype FROM testdata WHERE climatetype IS NOT NULL";
        sequelize.query(query, {type : sequelize.QueryTypes.SELECT}
        ).then(function(val){
            //var x;
            //for (x in val.keys())
            //console.log("Inside for");
            var myobj ='{"vals":'+JSON.stringify(val)+'}';
            console.log(myobj);
            res.render('failureModesInfo',JSON.parse(myobj));

        });
    }else{
        res.render('loginRegPage');
    }

};

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
        /*
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
        */
        res.render('failureModesResult');
    }else{
        res.render('loginRegPage');
    }
    //res.render('solarSystemInfoResults');
};
