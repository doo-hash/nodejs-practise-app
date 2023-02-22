const Tasks = require("../models/Tasks.js");

const getAllTasks = async (idObj) => {
    const tasks = await Tasks.findAll({where : idObj});
    if(tasks == ""){
        return null;
    }
    return tasks;
};

const getTask = async (dataobj) => {
    const task = await Tasks.findOne({where : dataobj});
    if(task){
        return task;
    }
    return null;
};

const createTask = async (taskData) => {
    const task = await Tasks.create(taskData);
    return task;
};
const bulkCreateTask = async (taskDataObj) => {
    const tasks = await Tasks.bulkCreate(taskDataObj);
    return tasks;
};
const updateTask = async (taskData, idObj) => {
    const task = await Tasks.findOne({where : idObj});
    if(task){
        await Tasks.update(taskData,{where : idObj});
        const updatedTask = await Tasks.findOne({where : idObj});
        return updatedTask;
    }
    return null;
};

const deleteTask = async (dataobj) => {
    const task = await Tasks.findOne({where : dataobj});
    if(task){
        await Tasks.destroy({where : dataobj});
    }
    return null;
};

module.exports = {
    createTask,
    bulkCreateTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}