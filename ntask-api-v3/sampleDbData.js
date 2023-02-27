const sequelize = require("./db-connection.js");
const Employee = require("./models/Employee.js");
const Tasks = require("./models/Task.js");

module.exports = async function sampleDbData() {
    // await sequelize.sync({force : true});
    let employee = {
        fullName: "Naruto",
        userName: "Uzumaki",
        email: "naruto@ninja.net",
        password: "9tailfox"
    };
    let data = await Employee.create(employee);
    let btasks = [
        { title: "Work", EmployeeId: data.id },
        { title: "Practise", EmployeeId: data.id },
        { title: "Plan", EmployeeId: data.id },
        { title: "Revise", EmployeeId: data.id },
    ];
    await Tasks.bulkCreate(btasks);

    let employees = await Employee.findAll({where :{}});
    let tasks = await Tasks.findAll({where : {}});
    return { employees, tasks };
}