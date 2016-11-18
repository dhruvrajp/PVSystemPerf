/**
 * Created by Dhruvraj on 11/17/2016.
 */

var sequelize=require("../config/sequelize").getSequelize;
bcrypt = require('bcryptjs');


exports.renderMain = function(req, res) {
    res.render('loginRegPage');
};

exports.renderRegSolSysOwner = function(req, res) {
    res.render('registerSolarSystemOwner');
};

exports.addSolSysOwner = function(req,res){
    console.log('inside server controller signup' + JSON.stringify(req.body))
    var companyname=req.body.companyName;
    var ownername=req.body.ownerName;
    var addressstreet=req.body.addressStreet;
    var addresscity=req.body.addressCity;
    var zipCode= req.body.zipCode;
    var addressstate=req.body.addressState;
    var phone=req.body.phone;
    var email=req.body.email;
    var password=req.body.password;

    var address=addressstreet+" "+addresscity+" "+addressstate+" "+zipCode;

    bcrypt.hash(password, 10, function(err,hash) {
        console.log("hash is " + hash);
        bcrypt.compare(password, hash, function (err, result) {
            if (err) {
                console.log("error is" + err);
            }
            console.log("res is " + result);
        });
        password = hash;
    })

    var query = "insert into solarsystemowners (email, password,companyname,ownername,address,phone) values (:email, :password, :companyname, :ownername, :address, :phone)";
    sequelize.query(query,{ replacements: {email: email, password: password, companyname:companyname, ownername:ownername, address:address, phone:phone }})
        .then(function(success) {
            console.log("signup successful"+JSON.stringify(success));
            return res.redirect("/addPv");
        });

};


