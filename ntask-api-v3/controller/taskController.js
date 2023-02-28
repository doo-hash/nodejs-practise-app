const Tasks = require("../models/Task.js");

const findAll = async () => {
    const tasks = await Tasks.findAll({where : {}});
    if(tasks == ""){
        return null;
    }
    return tasks;
};

const findAllforEmp = async (idObj) => {
    const tasks = await Tasks.findAll({where : idObj});
    if(tasks == ""){
        return null;
    }
    return tasks;
};

const findTask = async (dataObj) => {
    const task = await Tasks.findOne({where : dataObj});
    if(task){
        return task;
    }
    return null;
};

const saveTask = async (dataObj) => {
    if(dataObj.EmployeeId != null){
        const task = await Tasks.create(dataObj);
        return task;    
    }
    return null;
};

const saveBulkTasks = async (bulkTaskData) => {
    const tasks = await Tasks.bulkCreate(bulkTaskData);
    return tasks;
};

const updateTask = async (updateObj, idObj) => {
    const task = await Tasks.findOne({where : idObj});
    if(task){
        await Tasks.update(updateObj, {where : idObj});
        const updateTask = await Tasks.findOne({where : idObj});
        return updateTask;
    }
    return null;
};

const deleteTask = async (idObj) => {
    const task = await Tasks.findOne({where : idObj});
    if(task){
       await Tasks.destroy({where : idObj});
    }
};

module.exports = {
    findAll,
    findAllforEmp,
    findTask,
    saveBulkTasks,
    saveTask,
    updateTask,
    deleteTask
}