const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Tasks = require("./Tasks.js");

const User = sequelize.define("User", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull :false
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    } 
},
{
    tableName : "NewUser"
});

User.hasMany(Tasks);
// Tasks.belongsTo(User);
console.log(User === sequelize.models.User);
module.exports = User;