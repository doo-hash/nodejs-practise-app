const Employee = require("../models/Employee.js");
const Tasks = require("../models/Task.js");

const findAllEmployees = async () => {
    const employees = await Employee.findAll({where : {}});
    if(employees == ""){
        return null;
    }
    return employees;
};

const findEmployee = async (dataObj) => {
    const employee = await Employee.findOne({where : dataObj});
    if(!employee){
        return null;
    }
    if(employee.inActive){
        return null;
    }
    return employee;
};

const findEmployeewithTasks = async (dataObj) => {
    const employee = await Employee.findOne({where : dataObj, include : "tasks"});
    if(!employee){
        return null;
    }
    if(employee.inActive){
        return null;
    }
    return employee;
};

const saveEmployee = async (employeeObj) => {
    const employee = await Employee.create(employeeObj);
    return employee;
};

const updateEmployee = async (updateObj, idObj) => {
    const employee = await Employee.findOne({where : idObj});
    if(employee){
        if(!employee.inActive){
            await Employee.update(updateObj, {where : idObj});
            const updateEmp = await Employee.findOne({where : idObj});
            return updateEmp;    
        }
    }
    return null;
};

const deleteEmployee = async (dataObj) => {
    const employee = await Employee.findOne({where : dataObj});
    if(employee && !employee.inActive){
        await Employee.update({inActive : true}, {where : dataObj});
        await Tasks.destroy({where : {EmployeeId : employee.id}});
        const deletedEmp = await Employee.findOne({wher : dataObj});
        return deletedEmp;        
    }
    return null;
};

module.exports = {
    findAllEmployees,
    findEmployee,
    findEmployeewithTasks,
    saveEmployee,
    updateEmployee,
    deleteEmployee
};