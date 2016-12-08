/**
 * Created by saura on 11/27/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;
var sess;


exports.renderHome = function(req, res) {
    sess = req.session;
    if(sess.email){
        var query = "SELECT DISTINCT climatetype FROM testdata WHERE climatetype IS NOT NULL";
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

        var exec = require('child_process').exec;
        var cmd = 'C:\\Users\\saura\\Downloads\\WinPython-64bit-3.4.4.4Qt5\\python-3.4.4.amd64\\python.exe "C:\\Users\\saura\\Documents\\Sem 3\\IFT 540\\Project\\Applied Project\\main.py"';

        exec(cmd, function(error, stdout, stderr) {
            // command output is in stdout
            console.log(stdout);
            console.log(stderr);
            console.log(error);
         //   var myobj ='{"vals":'+JSON.stringify(stdout)+'}';
            var myobj ='{"vals":'+stdout+'}';
            res.render('failureModesResult', JSON.parse(myobj));
        });

    }else{
        res.render('loginRegPage');
    }
    //res.render('solarSystemInfoResults');
};
