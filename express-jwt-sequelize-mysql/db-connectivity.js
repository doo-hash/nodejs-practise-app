const Sequelize = require("sequelize");

const sequelize = new Sequelize({
    database : "users_db",
    username : "root",
    password : "fungame",
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