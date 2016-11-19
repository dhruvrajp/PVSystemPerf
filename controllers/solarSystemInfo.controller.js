/**
 * Created by saura on 11/18/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;

exports.printResults = function(req, res){
    /*
     var email = req.body.username;
     var pass = req.body.password;
     //console.log("Inside Login User Emaol= "+ String(email) +"" + String(pass));

     var query = "SELECT Email, password FROM solarsystemowners WHERE Email= :email";
     sequelize.query(query, {replacements: {email : email} ,type : sequelize.QueryTypes.SELECT}
     ).then(function(val){

     */
    var systemcode = req.body.systemcode;
    var query = "SELECT * FROM solarsystems WHERE systemcode = :systemcode";
    sequelize.query(query, {replacements: {systemcode: systemcode}, type : sequelize.QueryTypes.SELECT}
    ).then(function(val){
        //var x;
        //for (x in val.keys())
        console.log(val);
        var myobj ='{"vals":'+JSON.stringify(val)+'}';
        res.render('solarSystemInfoResults',JSON.parse(myobj));

    });
    //res.render('solarSystemInfoResults');
};

exports.renderHome = function(req, res) {
    var query = "SELECT systemcode FROM solarsystems";
    sequelize.query(query, {type : sequelize.QueryTypes.SELECT}
    ).then(function(val){
        //var x;
       //for (x in val.keys())
        //console.log("Inside for");
        var myobj ='{"vals":'+JSON.stringify(val)+'}';
        res.render('solarSystemInfo',JSON.parse(myobj));

    });

};