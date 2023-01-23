const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.js");

const Tasks = sequelize.define("Tasks", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    title : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    done : {
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
},{
    tableName : "NewTasks"
}
);

console.log(Tasks === sequelize.models.Tasks);
module.exports = Tasks