// const { expect } = require("chai");
// const taskController = require("../controller/task.js");
// const Tasks = require("../models/Tasks.js");
// const User = require("../models/User.js");
// let user = null;

// describe("test for TaskController", () => {
//     before("sync models", async () => {
//         await Tasks.destroy({where : {}});
//         await User.destroy({where : {}});
//         user = await User.create({ 
//             firstName : "Naruto", 
//             lastName : "Uzumaki", 
//             email : "naruto@ninja.net", 
//             password : "9tailfox"
//         });

//         await Tasks.bulkCreate([
//             {title : "Work", UserId : user.id},
//             {title : "Practise", UserId : user.id},
//             {title : "Plan", UserId : user.id},
//             {title : "Revise", UserId : user.id},
//         ]);
//     });

//     it("should get All tasks", async () => {
//         const getTasks = await taskController.getAllTasks();
//         expect(getTasks.length).to.equal(4);
//         expect(getTasks[0].UserId).to.equal(user.id);
//         expect(getTasks[1].UserId).to.equal(user.id);
//         expect(getTasks[2].UserId).to.equal(user.id);
//         expect(getTasks[3].UserId).to.equal(user.id);
//         expect(getTasks[0].title).to.equal("Work");
//         expect(getTasks[1].title).to.equal("Practise");
//         expect(getTasks[2].title).to.equal("Plan");
//         expect(getTasks[3].title).to.equal("Revise");
//     });

//     it("should get a single task", async () => {       
//         const createTask = await Tasks.create({title : "Play", UserId : user.id});
//         const getTask = await taskController.getTask({id : createTask.id, UserId : user.id});
//         expect(getTask.id).to.equal(createTask.id);
//         expect(getTask.title).to.equal(createTask.title);
//         expect(getTask.UserId).to.equal(user.id); 
//     });

//     it("should create a Task", async () => {
//         const newTask = await taskController.createTask({title : "Play", UserId : user.id});
//         expect(newTask).to.have.property("id");
//         expect(newTask).to.have.property("title");
//         expect(newTask).to.have.property("done");
//         expect(newTask).to.have.property("UserId").to.equal(user.id);
//     });

//     it("should update a Task", async () => {
//         const createTask = await Tasks.create({title : "Play", UserId : user.id});
//         const newTask = await taskController.updateTask({title : "Excercise"}, {id : createTask.id, UserId : createTask.UserId});
//         expect(newTask).to.have.property("title").to.equal("Excercise");
//         expect(newTask).to.have.property("UserId").to.equal(user.id);
//     });

//     it("should delete a Task", async () => {
//         const createTask = await Tasks.create({title : "Play", UserId : user.id});
//         await taskController.deleteTask({id : createTask.id, UserId : createTask.UserId});
//         const deletedTask = await Tasks.findOne({where : {id : createTask.id, UserId : createTask.UserId}});
//         expect(deletedTask).to.equal(null);
//     });

//     it("should create a bulk of tasks", async () => {
//         const tasks = await taskController.bulkCreateTask([
//             {title : "Work", UserId : user.id},
//             {title : "Practise", UserId : user.id},
//             {title : "Plan", UserId : user.id},
//             {title : "Revise", UserId : user.id},
//         ]);     

//         expect(tasks.length).to.equal(4);
//         expect(tasks[0].UserId).to.equal(user.id);
//         expect(tasks[1].UserId).to.equal(user.id);
//         expect(tasks[2].UserId).to.equal(user.id);
//         expect(tasks[3].UserId).to.equal(user.id);
//         expect(tasks[0].title).to.equal("Work");
//         expect(tasks[1].title).to.equal("Practise");
//         expect(tasks[2].title).to.equal("Plan");
//         expect(tasks[3].title).to.equal("Revise");
//     });
// });