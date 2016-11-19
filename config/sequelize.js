/**
 * Created by vipul on 4/23/2016.
 */
var Sequelize = require('sequelize');

/*var sequelize = new Sequelize('solarsundevils', 'root', {
    host: 'localhost',
    dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
    port:    3306, // or 5432 (for postgres) // initial value 3300
    logging: console.log
});*/
var sequelize = new Sequelize('mysql://root@localhost:3306/solarsundevils');
sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
        var query = "select * from solarsystems limit 10;"
        //var query = "exec dbo.sp_insert_person 'vipul.sarin@google.com','abcde','Vipul','Sarin'";
        //var query = "select [dbo].[udf_authenticate]('abc@bcd.com','pass')";
        //var query = "exec dbo.sp_retrieve_new_requests 'mayteh.kendall@yahoo.com',3"
        sequelize.query(query, { type: sequelize.QueryTypes.SELECT})
            .then(function(users) {
                console.log(JSON.stringify(users));
            })

    }, function (err) {
        console.log('Unable to connect to the database:', err);
    });


exports.getSequelize = sequelize;