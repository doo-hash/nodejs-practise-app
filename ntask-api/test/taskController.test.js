const { expect } = require("chai");
const taskController = require("../controller/task.js");
const Tasks = require("../models/Tasks.js");
const User = require("../models/User.js");
let user = null;

describe("tests for TaskController CRUD", () => {
    beforeEach("sync models", async () => {
        await Tasks.destroy({where : {}});
        await User.destroy({where : {}});
        user = await User.create({ 
            firstName : "Naruto", 
            lastName : "Uzumaki", 
            email : "naruto@ninja.net", 
            password : "9tailfox"
        });
    });

    it("GET -- should get All tasks", async () => {
        await Tasks.bulkCreate([
            {title : "Work", UserId : user.id},
            {title : "Practise", UserId : user.id},
            {title : "Plan", UserId : user.id},
            {title : "Revise", UserId : user.id},
        ]);
        const getTasks = await taskController.getAllTasks();
        expect(getTasks.length).to.equal(4);
        expect(getTasks[0].UserId).to.equal(user.id);
        expect(getTasks[1].UserId).to.equal(user.id);
        expect(getTasks[2].UserId).to.equal(user.id);
        expect(getTasks[3].UserId).to.equal(user.id);
        expect(getTasks[0].title).to.equal("Work");
        expect(getTasks[1].title).to.equal("Practise");
        expect(getTasks[2].title).to.equal("Plan");
        expect(getTasks[3].title).to.equal("Revise");
    });

    it("GET --all tasks -- should return null if no task found", async () => {
        const getTasks = await taskController.getAllTasks();
        expect(getTasks).to.equal(null);
    });

    it("GET -- should get a single task", async () => {       
        const createTask = await Tasks.create({title : "Play", UserId : user.id});
        const getTask = await taskController.getTask({id : createTask.id, UserId : user.id});
        expect(getTask.id).to.equal(createTask.id);
        expect(getTask.title).to.equal(createTask.title);
        expect(getTask.UserId).to.equal(user.id); 
    });

    it("GET -- get single task -- should return null if no task found", async () => {       
        const getTask = await taskController.getTask({id : 4, UserId : user.id});
        expect(getTask).to.equal(null);
    });
    
    it("CREATE -- should create a Task", async () => {
        const newTask = await taskController.createTask({title : "Play", UserId : user.id});
        expect(newTask).to.have.property("id");
        expect(newTask).to.have.property("title");
        expect(newTask).to.have.property("done");
        expect(newTask).to.have.property("UserId").to.equal(user.id);
    });

    it("UPDATE -- should update a Task", async () => {
        const createTask = await Tasks.create({title : "Play", UserId : user.id});
        const newTask = await taskController.updateTask({title : "Excercise"}, {id : createTask.id, UserId : createTask.UserId});
        expect(newTask).to.have.property("title").to.equal("Excercise");
        expect(newTask).to.have.property("UserId").to.equal(user.id);
    });

    it("UPDATE -- update task -- should return null if no Task found", async () => {
        const newTask = await taskController.updateTask({title : "Excercise"}, {id : 5, UserId : user.id});
        expect(newTask).to.equal(null);
    });

    it("DELETE -- should delete a Task", async () => {
        const createTask = await Tasks.create({title : "Play", UserId : user.id});
        const task = await taskController.deleteTask({id : createTask.id, UserId : createTask.UserId});
        const deletedTask = await Tasks.findOne({where : {id : createTask.id, UserId : createTask.UserId}});
        expect(task).to.equal(null);
        expect(deletedTask).to.equal(null);
    });

    it("DELETE -- delete task -- should return null if no Task is found", async () => {
        const task = await taskController.deleteTask({id : 5, UserId : user.id});
        expect(task).to.equal(null);
    });

    it("CREATE -- should create a bulk of tasks", async () => {
        const tasks = await taskController.bulkCreateTask([
            {title : "Work", UserId : user.id},
            {title : "Practise", UserId : user.id},
            {title : "Plan", UserId : user.id},
            {title : "Revise", UserId : user.id},
        ]);     

        expect(tasks.length).to.equal(4);
        expect(tasks[0].UserId).to.equal(user.id);
        expect(tasks[1].UserId).to.equal(user.id);
        expect(tasks[2].UserId).to.equal(user.id);
        expect(tasks[3].UserId).to.equal(user.id);
        expect(tasks[0].title).to.equal("Work");
        expect(tasks[1].title).to.equal("Practise");
        expect(tasks[2].title).to.equal("Plan");
        expect(tasks[3].title).to.equal("Revise");
    });
});