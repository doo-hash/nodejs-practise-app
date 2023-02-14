const { Sequelize } = require("sequelize");
const sequelize = require("./db-connectivity.js");

const User = sequelize.define('user', {
    full_name : {
        type : Sequelize.STRING,
    },
    username : {
        type : Sequelize.STRING,
    },
    password : {
        type : Sequelize.STRING,
    }
});

User.sync()
    .then(() => {
        console.log('Oh yeah! User Table created succesfully');
    })
    .catch((error) => {
        console.log('BTW, did you enter wrong database credentials?');
    });

module.exports = User;