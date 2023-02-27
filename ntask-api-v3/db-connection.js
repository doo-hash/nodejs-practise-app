const Sequelize = require("sequelize");
const dbConfig  = require("./lib/config.js");

const sequelize = new Sequelize({
    database : dbConfig.database,
    username : dbConfig.username,
    password : dbConfig.password,
    dialect : "mysql"
});

sequelize.authenticate()
            .then(() => {
                console.log("Connection Successfull");
            })
            .catch((err) => {
                console.log("Unable to connect to server", err.message);
            });

module.exports = sequelize;