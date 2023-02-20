const { Sequelize } = require("sequelize");
const sequelize = require("../db-connectivity.js");
const bcrypt = require("bcrypt");
const Tasks = require("./Tasks.js");

const User = sequelize.define("User", {
    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    email : {
        type : Sequelize.STRING,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    password : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    inActive : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
},{
    tableName : "user"
});

User.beforeCreate(user => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

User.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
};
User.hasMany(Tasks,{
    as : "tasks"
});
Tasks.belongsTo(User);

User.sync()
    .then(() => {
        console.log('Oh yeah! User Table created succesfully\n');
    })
    .catch((error) => {
        console.log('Wrong database credentials :(\n');
    });

console.log("For User Model : ", User === sequelize.models.User);
module.exports = User;