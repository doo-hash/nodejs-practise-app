const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const bcrypt = require("bcrypt");

const Users = sequelize.define("User", {
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

Users.beforeCreate(user => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

Users.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
};

// User.hasMany(Tasks); or
Users.associate = function({Tasks}) {
    Users.hasMany(Tasks);
};
// Tasks.belongsTo(Users);
console.log(Users === sequelize.models.Users);
module.exports = Users;