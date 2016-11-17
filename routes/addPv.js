var express = require('express');
var router = express.Router();
var controller=require("../controllers/addPv.controller.js");

router.get('/', controller.renderHome);

module.exports = router;