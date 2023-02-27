const { Sequelize } = require("sequelize");
const sequelize = require("../db-connection.js");

const Tasks = sequelize.define("Tasks", {
    title : {
        type : Sequelize.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    done : {
        type : Sequelize.BOOLEAN,
        allowNull : false,
        defaultValue : false
    }
}
);
Tasks.sync();
module.exports = Tasks