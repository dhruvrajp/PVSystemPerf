/**
 * Created by Dhruvraj on 11/26/2016.
 */
var xml2js = require('xml2js');
var sequelize=require("../config/sequelize").getSequelize;
var fs = require('fs');
var parser = new xml2js.Parser();
var express = require('express');
var testTypeId;

var fileObj;
exports.renderError = function(req,res){
    res.render('/XMLFileError');
}

exports.parsePVFile = function(req,res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream('../public/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
         fs.readFile('../public/' + filename, function(err, data) {
             parser.parseString(data, function (err, result) {
                if(result) {
                    var location= result['form']['location'].toString();
                    var site= result['form']['site'].toString();
                    var manufacturer= result['form']['manufacturer'].toString();
                    var manufacturermodeldesignation= result['form']['mmd'].toString();
                    var technology=  result['form']['technology'].toString();
                    var fixedtilttracking= result['form']['flt'].toString();
                    var construction= result['form']['construction'].toString();
                    var numberofmodulesinthesystem= result['form']['nom'].toString();
                    var exposedyearsatthetimeofevaluation= result['form']['exposedyears'].toString();
                    var evaluationyear= result['form']['evaluationyear'].toString();
                    var query = "insert into solarsystems (location,site,manufacturer,manufacturermodeldesignation,technology,fixedtilttracking,construction,numberofmodulesinthesystem,exposedyearsatthetimeofevaluation,evaluationyear) values (:location,:site,:manufacturer,:manufacturermodeldesignation,:technology,:fixedtilttracking,:construction,:numberofmodulesinthesystem,:exposedyearsatthetimeofevaluation,:evaluationyear)";
                    sequelize.query(query,{ replacements: {location:location,site:site,manufacturer:manufacturer,manufacturermodeldesignation:manufacturermodeldesignation,technology:technology,fixedtilttracking:fixedtilttracking,construction:construction,numberofmodulesinthesystem:numberofmodulesinthesystem,exposedyearsatthetimeofevaluation:exposedyearsatthetimeofevaluation,evaluationyear:evaluationyear}})
                        .then(function(success) {
                            if(success) {
                                return res.redirect("/success");
                            }else{
                                res.render("authError");
                            }
                        });

                }else{
                    res.render("authError");
                }
            });
        });
       });
    });
};

exports.parseTestFile=function(req,res){
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream('../public/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            fs.readFile('../public/' + filename, function(err, data) {
                parser.parseString(data, function (err, result) {
                    if(result) {
                        try {
                            var testTypeID = result['form']['testtypeid'].toString();
                            var testType = result['form']['testtypename'].toString();
                            var testAgencyName = result['form']['testingagencyname'].toString();
                            var climateType = result['form']['climatetype'].toString();
                            var siteName = result['form']['sitename'].toString();
                            var model = result['form']['model'].toString();
                            var testMonthYear = result['form']['testmonthyear'].toString();
                            var ageEval = result['form']['ageatevaluation'].toString();
                            var numOfModules = result['form']['numberofmodulesinsystem'].toString();
                            var measurementUncertainty = result['form']['measurementuncertainty'].toString();
                            var modulesTested = result['form']['modulestested'].toString();

                            testTypeId=testTypeID;
                        }catch(err){
                            res.render("XMLFileError",{ error :err.toString()});
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
                                        if(testTypeId==1) {
                                            res.render("testDataOCSCFileUpload");
                                        }else{
                                            res.render("testDataVisualFileUpload");
                                        }
                                    }else{
                                        res.render("authError")
                                    }
                                });
                        });
                    }else{
                        res.render("XMLFileError");
                    }
                });
            });
        });
    });
};


exports.parseSpTest1=function(req,res){
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Inside");
            fstream = fs.createWriteStream('../public/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                fs.readFile('../public/' + filename, function (err, data) {
                    parser.parseString(data, function (err, result) {
                        try {
                            var moduleCode = result['form']['modulecode'].toString();
                            var measuredISC = result['form']['measureddataisc'].toString();
                            var measuredVoc = result['form']['measureddatavoc'].toString();
                            var measuredIMP = result['form']['measureddataimp'].toString();
                            var measuredVmp = result['form']['measureddatavmp'].toString();
                            var measuredFF = result['form']['measureddataff'].toString();
                            var measuredPower = result['form']['measureddatapower'].toString();
                            var degradationISC = result['form']['degradationisc'].toString();
                            var degradationVoc = result['form']['degradationvoc'].toString();
                            var degradationImp = result['form']['degradationimp'].toString();
                            var degradationVmax = result['form']['degradationvmax'].toString();
                            var degradationPmax = result['form']['degradationpmax'].toString();
                        } catch (err) {
                            res.render("XMLFileError", {error: err.toString()});
                        }
                        var queryCheckTestAgency = "select MAX(TestID) from testdata";
                        sequelize.query(queryCheckTestAgency, {
                            type: sequelize.QueryTypes.SELECT
                        }).then(function (val) {
                            var testID = (JSON.stringify(val[0]).split(":"))[1].replace('}', '');
                            console.log("Inserting Test Data " + testID);
                            var query = "insert into testtype1 (TestID,ModuleCode,MeasuredDataIsc,MeasuredDataVoc,MeasuredDataImp,MeasuredDataVmp,MeasuredDataFF,MeasuredDataPower,DegradationIsc,DegradationVoc,DegradationImp,DegradationVmax,DegradationPmax) " +
                                "values (:testID,:moduleCode,:measuredISC,:measuredVoc,:measuredIMP,:measuredVmp,:measuredFF,:measuredPower,:degradationISC,:degradationVoc,:degradationImp,:degradationVmax,:degradationPmax)";
                            sequelize.query(query, {
                                replacements: {
                                    testID: testID,
                                    moduleCode: moduleCode,
                                    measuredISC: measuredISC,
                                    measuredVoc: measuredVoc,
                                    measuredIMP: measuredIMP,
                                    measuredVmp: measuredVmp,
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
                                    if (success) {
                                        console.log("Test1 Data insertion Success" + JSON.stringify(success));
                                        testTypeId=1;
                                        res.render("success");
                                    } else {
                                        res.render("authError")
                                    }
                                });
                        });

                    });
                })
            });
        });
}



exports.parseSpTest2=function(req,res){
        var fstream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            fstream = fs.createWriteStream('../public/' + filename);
            file.pipe(fstream);
            fstream.on('close', function () {
                fs.readFile('../public/' + filename, function (err, data) {
                    parser.parseString(data, function (err, result) {
                        try{
                            var EncapsulantDiscoloration = result['form']['encapsulantdiscoloration'].toString();
                            var ModuleCode = result['form']['modulecode'].toString();
                            var BrokenInterconnect = result['form']['brokeninterconnect'].toString();
                            var HotSpots = result['form']['hotspots'].toString();
                            var BacksheetWarpingOrDetaching = result['form']['backsheetwarpingordetaching'].toString();
                            var CellDiscoloration = result['form']['celldiscoloration'].toString();
                            var BurnThroughBacksheet = result['form']['burnthroughbacksheet'].toString();
                            var MetallizationDiscoloration = result['form']['metallizationdiscoloration'].toString();
                            var RsRso = result['form']['rsrso'].toString();
                            var SolderBondFailure = result['form']['solderbondfailure'].toString();
                            var Delamination = result['form']['delamination'].toString();
                            var BrokenOrChippedCells = result['form']['brokenorchippedcells'].toString();
                            var PmDrop = result['form']['pmdrop'].toString();


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
                                            res.render("success");
                                        }else{
                                            res.render("authError")
                                        }
                                    });
                            });
                        }catch(err){
                            res.render("XMLFileError",{ error :err.toString()});
                        }
                    });
                });
            });
        });
}