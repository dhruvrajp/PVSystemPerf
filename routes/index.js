var express = require('express');
var router = express.Router();
var controller=require("../controllers/mainPage.controller.js");

/* GET home page. */
router.get('/', controller.renderMain);

module.exports = router;
