const { Sequelize } = require("sequelize");
const sequelize = require("../db-connectivity.js");

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
},{
    tableName : "task"
});

Tasks.sync()
        .then(() => {
            console.log('Tasks table created succesfully!:)!\n');
        })
        .catch((error) => {
            console.log('Wrong database credentials :(\n');
        });

console.log("For Tasks model : ", Tasks === sequelize.models.Tasks);
module.exports = Tasks;