/**
 * Created by Dhruvraj on 12/4/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;
var sess;
exports.renderHome=function(req,res){
    sess=req.session;
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
            res.render('monitoringData',JSON.parse(myobj));
        });
    }else{
        res.render('loginRegPage');
    }
};

exports.processMonitoring=function(req,res){
    if(sess.email) {
        console.log("Inside Post");
        console.log('inside processFormTestData' + JSON.stringify(req.body))
        var systemcode = req.body.systemID;
        var monthYear = req.body.monthYear;
        var actualPower = req.body.actualPower;
        var predictedPower = req.body.predictedPower;

        var query = "insert into monitoringdatayearly (systemcode,monthYear,actualPower,predictedPower) " +
                "values (:systemcode,:monthYear,:actualPower,:predictedPower)";
            sequelize.query(query, {
                replacements: {
                    systemcode: systemcode,
                    monthYear: monthYear,
                    actualPower: actualPower,
                    predictedPower: predictedPower
                }
            })
                .then(function (success) {
                    if(success) {
                        console.log("Monitoring Data Success" + JSON.stringify(success));
                        return res.redirect("/success");
                    }else{
                        res.render("authError")
                    }
                });
    }else{
        res.render('loginRegPage');
    }
};
