/**
 * Created by saura on 11/27/2016.
 */
var express = require('express');
var router = express.Router();
var controller=require("../controllers/failureModes.controller.js");

router.get('/', controller.renderHome);

module.exports = router;