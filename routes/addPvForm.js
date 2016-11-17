/**
 * Created by Dhruvraj on 11/17/2016.
 */
var express = require('express');
var router = express.Router();
var controller=require("../controllers/addPv.controller.js");

router.all('/', controller.renderForm);



module.exports = router;