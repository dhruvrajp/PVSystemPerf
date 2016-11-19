/**
 * Created by saura on 11/18/2016.
 */
var express = require('express');
var router = express.Router();
var controller=require("../controllers/addCerti.controller.js");

router.get('/', controller.renderHome);

module.exports = router;