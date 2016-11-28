/**
 * Created by Dhruvraj on 11/20/2016.
 */
'use strict';

var sequelize=require("../config/sequelize").getSequelize;

var sess;
exports.renderHome=function(req,res){
    sess=req.session;
    if(sess.email) {
        res.render("testDataMainPage");
    }else{
        res.render("loginRegPage");
    }
};

exports.renderOCSC=function(req,res){
    sess=req.session;
    console.log(req.session.email);
    if(sess.email) {
        res.render("testDataOCSC&Efficiency");
    }else{
        res.render("loginRegPage");
    }
};

exports.renderVisual=function(req,res){
    sess=req.session;
    if(sess.email) {
        res.render("testDataVisual");
    }else{
        res.render("loginRegPage");
    }
};

exports.renderOCSCFile=function(req,res){
    sess=req.session;
    console.log(req.session.email);
    if(sess.email) {
        res.render("testDataOCSC&Efficiency");
    }else{
        res.render("loginRegPage");
    }
};

exports.renderVisualFile=function(req,res){
    sess=req.session;
    console.log(req.session.email);
    if(sess.email) {
        res.render("testDataOCSC&Efficiency");
    }else{
        res.render("loginRegPage");
    }
};

exports.renderFile=function(req,res){
    sess=req.session;
    if(sess.email) {
        res.render("addTestFile");
    }else{
        res.render("loginRegPage");
    }
};

exports.processForm = function(req,res){
    sess=req.session;
    if(sess.email) {
        console.log("Inside Post");
        console.log('inside processFormTestData' + JSON.stringify(req.body))
        var testType = req.body.testType;
        var testAgencyName = req.body.testAgencyName;
        var climateType = req.body.climateType;
        var siteName = req.body.siteName;
        var model = req.body.model;
        var month = req.body.month;
        var year = req.body.year;
        var ageEvalMonth = req.body.ageEvalMonth;
        var ageEvalYear = req.body.ageEvalYear;
        var numOfModules = req.body.numOfModules;
        var measurementUncertainty = req.body.measurementUncertainity;
        var modulesTested = req.body.modulesTested;

        var testMonthYear = month + " " + year;
        var ageEvaluation=ageEvalYear.toString().replace(" Year(s)","") + "." + ageEvalMonth.toString().replace(" month(s)","");
        console.log(ageEvaluation);
        var ageEval = parseFloat(ageEvaluation);
        var testTypeId = 1;
        if (testType.toString() == 'Visual Inspection') {
            testTypeId = 2;
        }

        var testAgencyID = -1;
        var queryCheckTestAgency = "select TestingAgencyID from testingagencies where TestingAgencyName=:testAgencyName";

        sequelize.query(queryCheckTestAgency, {
            replacements: {testAgencyName: testAgencyName},
            type: sequelize.QueryTypes.SELECT
        }).then(function (val) {
            testAgencyID = (JSON.stringify(val[0]).split(":"))[1].replace('}','');
            console.log("Inserting Test Data");
            var query = "insert into testdata (TestTypeID,TestTypeName,TesttingAgencyID,ClimateType,SiteName,Model,TestMonthYear,NumberOfModulesInSystem,AgeAtEvaluation,ModulesTested,MeasurementUncertainty) values (:testTypeId,:testType,:testAgencyID,:climateType,:siteName,:model,:testMonthYear,:numOfModules,:ageEval,:modulesTested,:measurementUncertainty)";
            console.log(query);
            sequelize.query(query, {
            replacements: {
                testTypeId: testTypeId,
                testType: testType,
                testAgencyID: testAgencyID,
                climateType: climateType,
                siteName: siteName,
                model: model,
                testMonthYear: testMonthYear,
                numOfModules: numOfModules,
                ageEval: ageEval,
                modulesTested: modulesTested,
                measurementUncertainty: measurementUncertainty
            }
            })
            .then(function (success) {
                if(success) {
                    console.log("Test Data insertion Success" + JSON.stringify(success));
                    if (testTypeId.toString() == 1) {
                        req.session.testTypeId = 1;
                        return res.redirect("/testDataOCSC&Efficiency");
                    } else {
                        req.session.testTypeId = 2;
                        return res.redirect("/testDataVisualInspection");
                    }
                }else{
                    res.render("authError")
                }

            });
        });
    }else{
        res.render('loginRegPage');
    }
};

exports.renderOCSC=function(req,res){
    if(req.session.testTypeId==1){
        res.render('testDataOCSC&Efficiency');
    }else if(req.session.testTypeId==2){
        res.render('testDataVisualInspection');
    }else{
        res.render('loginRegPage');
    }
};


exports.processOCSC=function(req,res){
    if(sess.email) {
        console.log("Inside Post");
        console.log('inside processFormTestData' + JSON.stringify(req.body))
        var moduleCode = req.body.moduleCode;
        var measuredISC = req.body.measuredISC;
        var measuredVoc = req.body.measuredVoc;
        var measuredIMP = req.body.measuredIMP;
        var measuredVmp = req.body.measuredVmp;
        var measuredFF = req.body.measuredFF;
        var measuredPower = req.body.measuredPower;
        var degradationISC = req.body.degradationISC;
        var degradationVoc = req.body.degradationVoc;
        var degradationImp = req.body.degradationImp;
        var degradationVmax = req.body.degradationVmax;
        var degradationPmax = req.body.degradationPmax;

        var queryCheckTestAgency = "select MAX(TestID) from testdata";
        console.log(queryCheckTestAgency)
        sequelize.query(queryCheckTestAgency, {
            type: sequelize.QueryTypes.SELECT
        }).then(function (val) {
            var testID = (JSON.stringify(val[0]).split(":"))[1].replace('}','');
            console.log("Inserting Test Data "+testID);
            var query = "insert into testtype1 (TestID,ModuleCode,MeasuredDataIsc,MeasuredDataVoc,MeasuredDataImp,MeasuredDataVmp,MeasuredDataFF,MeasuredDataPower,DegradationIsc,DegradationVoc,DegradationImp,DegradationVmax,DegradationPmax) " +
                "values (:testID,:moduleCode,:measuredISC,:measuredVoc,:measuredIMP,:measuredVmp,:measuredFF,:measuredPower,:degradationISC,:degradationVoc,:degradationImp,:degradationVmax,:degradationPmax)";
             sequelize.query(query, {
                replacements: {
                    testID: testID,
                    moduleCode: moduleCode,
                    measuredISC: measuredISC,
                    measuredVoc: measuredVoc,
                    measuredIMP: measuredIMP,
                    measuredVmp:measuredVmp,
                    measuredFF: measuredFF,
                    measuredPower: measuredPower,
                    degradationISC: degradationISC,
                    degradationVoc: degradationVoc,
                    degradationImp: degradationImp,
                    degradationPmax: degradationPmax,
                    degradationVmax: degradationVmax
                }
            })
                .then(function (success) {
                    if(success) {
                        console.log("Test Data insertion Success" + JSON.stringify(success));
                        return res.redirect("/success");
                    }else{
                        res.render("authError")
                    }
                });
        });
    }else{
        res.render('loginRegPage');
    }
};


exports.processVisual=function(req,res){
    if(sess.email) {
        console.log("Inside Post");
        console.log('inside processFormTestData' + JSON.stringify(req.body))
        var EncapsulantDiscoloration = req.body.EncapsulantDiscoloration.toString()=='Yes'?1:0;
        var ModuleCode = req.body.ModuleCode;
        var BrokenInterconnect = req.body.InterconnectBreakage.toString()=='Yes'?1:0;
        var HotSpots = req.body.HotSpots.toString()=='Yes'?1:0;
        var BacksheetWarpingOrDetaching = req.body.BacksheetWarpingDetaching.toString()=='Yes'?1:0;
        var CellDiscoloration = req.body.CellDiscoloration.toString()=='Yes'?1:0;
        var BurnThroughBacksheet = req.body.BurnThroughBacksheet.toString()=='Yes'?1:0;
        var MetallizationDiscoloration = req.body.MetallizationDiscoloration.toString()=='Yes'?1:0;
        var RsRso = req.body.RsRso;
        var SolderBondFailure = req.body.SolderBondFailure.toString()=='Yes'?1:0;
        var Delamination = req.body.Delamination.toString()=='Yes'?1:0;
        var BrokenOrChippedCells = req.body.BrokenChippedCells.toString()=='Yes'?1:0;
        var PmDrop = req.body.PmDrop;


        var queryCheckTestAgency = "select MAX(TestID) from testdata";
        console.log(queryCheckTestAgency)
        sequelize.query(queryCheckTestAgency, {
            type: sequelize.QueryTypes.SELECT
        }).then(function (val) {
            var TestID = (JSON.stringify(val[0]).split(":"))[1].replace('}','');
            console.log("Inserting Test Data "+TestID);
            var query = "insert into testtype2 (TestID,ModuleCode,SolderBondFailure,EncapsulantDiscoloration,BrokenOrChippedCells,Delamination,MetallizationDiscoloration,HotSpots,BacksheetWarpingOrDetaching,CellDiscoloration,BrokenInterconnect,BurnThroughBacksheet,PmDrop,RsRso) " +
                "values (:TestID,:ModuleCode,:SolderBondFailure,:EncapsulantDiscoloration,:BrokenOrChippedCells,:Delamination,:MetallizationDiscoloration,:HotSpots,:BacksheetWarpingOrDetaching,:CellDiscoloration,:BrokenInterconnect,:BurnThroughBacksheet,:PmDrop,:RsRso)";
            sequelize.query(query, {
                replacements: {
                    TestID: TestID,
                    ModuleCode: ModuleCode,
                    SolderBondFailure: SolderBondFailure,
                    EncapsulantDiscoloration: EncapsulantDiscoloration,
                    BrokenOrChippedCells: BrokenOrChippedCells,
                    Delamination:Delamination,
                    MetallizationDiscoloration: MetallizationDiscoloration,
                    HotSpots: HotSpots,
                    BacksheetWarpingOrDetaching: BacksheetWarpingOrDetaching,
                    CellDiscoloration: CellDiscoloration,
                    BrokenInterconnect: BrokenInterconnect,
                    BurnThroughBacksheet: BurnThroughBacksheet,
                    PmDrop: PmDrop,
                    RsRso: RsRso
                }
            })
                .then(function (success) {
                    if(success) {
                        console.log("Test Data insertion Success" + JSON.stringify(success));
                        return res.redirect("/success");
                    }else{
                            res.render("authError")
                        }
                });
        });
    }else{
        res.render('loginRegPage');
    }
};
