const Tasks = require("../models/Tasks.js");

const getAllTasks = async () => {
    const tasks = await Tasks.findAll({where : {}});
    return tasks;
};

const getTask = async (dataobj) => {
    const task = await Tasks.findOne({where : dataobj});
    return task;
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
    await Tasks.update(taskData,{where : idObj});
    const task = await Tasks.findOne({where : idObj});
    return task;
};

const deleteTask = async (dataobj) => {
    await Tasks.destroy({where : dataobj});
};

module.exports = {
    createTask,
    bulkCreateTask,
    getAllTasks,
    getTask,
    updateTask,
    deleteTask
}