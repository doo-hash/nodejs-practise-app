const sequelize = require("../db-connection.js");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");
const Tasks = require("./Task.js");

const Employee = sequelize.define(
    "Employee", {
        fullName : {
            type : Sequelize.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        userName : {
            type : Sequelize.STRING,
            unique : true,
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
    }
);

Employee.beforeCreate(employee => {
    const salt = bcrypt.genSaltSync();
    console.log(employee)
    employee.password = bcrypt.hashSync(employee.password, salt);
});

Employee.hasMany(Tasks,{
    as : "tasks"
});
Tasks.belongsTo(Employee);

Employee.sync();
module.exports = Employee;