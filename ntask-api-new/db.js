const Sequelize = require("sequelize");
let config = null;
const env = process.env.NODE_ENV;
if(env != null){
    config = require(`./libs/config.${env}.js`); 
}
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