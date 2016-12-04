/**
 * Created by Dhruvraj on 11/18/2016.
 */
var Sequelize = require('sequelize')

var attributes = {
   CompanyId: {
       type: Sequelize.STRING,
       primaryKey: true
   },
   email: {
        type: Sequelize.STRING,
        validate: {

        }
    },
    password: {
        type: Sequelize.STRING,
    },
}

var options = {
    freezeTableName: true,
    timestamps:false
}

module.exports.attributes = attributes
module.exports.options = options