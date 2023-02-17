const Sequelize = require("sequelize");
const dbConfig = require("./lib/config.development.js");

const sequelize = new Sequelize({
    database : dbConfig.database,
    username : dbConfig.username,
    password : dbConfig.password,
    dialect : "mysql"
});

sequelize.authenticate()
            .then(() => {
                console.log("Connection has been established successfully.");
            })
            .catch((error) => {
                console.log("Unable to connect to the database : ", error);
            });

module.exports = sequelize;