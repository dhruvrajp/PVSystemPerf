/**
 * Created by Dhruvraj on 11/18/2016.
 */
var UserMeta = require('../model/users.js');

var Sequelize = require('sequelize');

var sequelize = new Sequelize('solarsundevils', 'root', 'admin', {
    host: 'localhost',
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3300, // or 5432 (for postgres)
    logging: console.log
});

var User = sequelize.define('solarsystemowners', UserMeta.attributes, {timestamps: false})

// you can define relationships here

module.exports.User = User