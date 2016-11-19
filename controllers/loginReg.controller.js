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

exports.loginUser = function(req, res) {
var email = req.body.email;
var pass = req.body.password;
//console.log("Inside Login User Emaol= "+ String(email) +"" + String(pass));

        var query = "SELECT Email, password FROM solarsystemowners WHERE Email= :email";
sequelize.query(query, {replacements: {email : email} ,type : sequelize.QueryTypes.SELECT}
).then(function(val){

        bcrypt.compare(pass , val[0]['password'], function (err, result) {
            console.log(result);
            if (result) {
               // console.log("error is" + err);
                sess=req.session;
                sess.email=email;
                return res.redirect("/addPv");
            }
            else {
                res.render('LoginError');
            }
        });

    /*
        console.log(val[0]);
    console.log(val[0]['password']);
    console.log("User Entered "+ String(pass));
    if (val[0]['password'] == pass)
    {
        return res.redirect("/addPv");
    }
    else
    {
        //Error Page, Login Again
        res.render('LoginError');
    }
    */
});


    };

exports.addSolSysOwner = function(req,res){
   // console.log('inside server controller signup' + JSON.stringify(req.body));
    //console.log("Inside Post" + String(Object.keys(req.body)));
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

    bcrypt.hash(password, 8, function(err,hash) {
        console.log("hash is " + hash);
        password = hash;


    var query = "insert into solarsystemowners (email, password,companyname,ownername,address,phone) values (:email, :password, :companyname, :ownername, :address, :phone)";
    sequelize.query(query,{ replacements: {email: email, password: password, companyname:companyname, ownername:ownername, address:address, phone:phone }})
        .then(function(success) {
            console.log("signup successful"+JSON.stringify(success));
            return res.redirect("/loginRegPage");
        });
    })

};


exports.logout=function(req,res){
    req.session.destroy(function(err) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
    });
};
