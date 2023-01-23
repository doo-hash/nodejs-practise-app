const Sequelize = require("sequelize");
const config = require("./libs/config.js");

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config.params
);

try{
    sequelize.authenticate();
    console.log("connection successfull");
} catch(err) {
    console.error("unable to connect to the database ", err);
}
module.exports = sequelize;