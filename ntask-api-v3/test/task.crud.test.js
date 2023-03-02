const expect = require("chai").expect;
const taskController = require("../controller/taskController.js");
const Employee = require("../models/Employee.js");
const Tasks = require("../models/Task.js");

describe("CRUD TEST FOR TASKS", () => {
    let employee = null;
    beforeEach("delete records", async () => {
        await Employee.destroy({where : {}});
        await Tasks.destroy({where : {}});
        let emp = {
            fullName: "Naruto",
            userName: "Uzumaki",
            email: "naruto@ninja.net",
            password: "9tailfox"
        };
        employee = await Employee.create(emp);
    });

    describe("GET - Test for findAll()", () => {
        it("shoudld return list of tasks data", async () => {
            let tasksdata = [
                { title: "Work", EmployeeId: employee.id },
                { title: "Practise", EmployeeId: employee.id },
                { title: "Plan", EmployeeId: employee.id },
                { title: "Revise", EmployeeId: employee.id },
            ];
            await Tasks.bulkCreate(tasksdata);
            const tasks = await taskController.findAll();
            expect(tasks.length).to.equal(4);
            expect(tasks[0].EmployeeId).to.equal(employee.id);
            expect(tasks[1].EmployeeId).to.equal(employee.id);
            expect(tasks[2].EmployeeId).to.equal(employee.id);
            expect(tasks[3].EmployeeId).to.equal(employee.id);
            expect(tasks[0].title).to.equal("Work");
            expect(tasks[1].title).to.equal("Practise");
            expect(tasks[2].title).to.equal("Plan");
            expect(tasks[3].title).to.equal("Revise");
        }); 

        it("should return null when no task found", async () => {
            const tasks = await taskController.findAll();
            expect(tasks).to.equal(null);
        });
    });

    describe("GET - Test for findAllforEmp()", () => {
        it("shoudld return list of tasks data for a given Employee", async () => {
            let tasksdata = [
                { title: "Work", EmployeeId: employee.id },
                { title: "Practise", EmployeeId: employee.id },
                { title: "Plan", EmployeeId: employee.id },
                { title: "Revise", EmployeeId: employee.id },
            ];
            await Tasks.bulkCreate(tasksdata);
            const tasks = await taskController.findAllforEmp({EmployeeId : employee.id});
            expect(tasks.length).to.equal(4);
            expect(tasks[0].EmployeeId).to.equal(employee.id);
            expect(tasks[1].EmployeeId).to.equal(employee.id);
            expect(tasks[2].EmployeeId).to.equal(employee.id);
            expect(tasks[3].EmployeeId).to.equal(employee.id);
            expect(tasks[0].title).to.equal("Work");
            expect(tasks[1].title).to.equal("Practise");
            expect(tasks[2].title).to.equal("Plan");
            expect(tasks[3].title).to.equal("Revise");
        }); 

        it("should return null for a given employee", async () => {
            const tasks = await taskController.findAllforEmp({EmployeeId : employee.id});
            expect(tasks).to.equal(null);
        });

        it("should return null when employee not fonud", async () => {
            let tasksdata = [
                { title: "Work", EmployeeId: employee.id },
                { title: "Practise", EmployeeId: employee.id },
                { title: "Plan", EmployeeId: employee.id },
                { title: "Revise", EmployeeId: employee.id },
            ];
            await Tasks.bulkCreate(tasksdata);
            const tasks = await taskController.findAllforEmp({EmployeeId : employee.id+1});
            expect(tasks).to.equal(null);
        });
    });

    describe("GET - Test for findTask()", () => {
        it("should return task data with valid employee id", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            let task = await Tasks.create(taskdata);

            const t = await taskController.findTask({id : task.id, EmployeeId : employee.id});
            expect(t.id).to.equal(task.id);
            expect(t.title).to.equal(task.title);
            expect(t.done).to.equal(task.done);
            expect(t.EmployeeId).to.equal(task.EmployeeId);
        }); 


        it("should return null when employee not fonud", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            let task = await Tasks.create(taskdata);
            const t = await taskController.findTask({id : task.id, EmployeeId : 1});
            expect(t).to.equal(null);
        });

        it("should return null when task not fonud", async () => {
            const t = await taskController.findTask({id : 1, EmployeeId : employee.id});
            expect(t).to.equal(null);
        });

        it("should return null when both employee task not fonud", async () => {
            const t = await taskController.findTask({id : 1, EmployeeId : 1});
            expect(t).to.equal(null);
        });
    });

    describe("POST - Test for saveTask()", () => {
        it("should save and return Task data with valid Employee", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            const t = await taskController.saveTask(taskdata);
            expect(t).to.have.property("id");
            expect(t.title).to.equal(taskdata.title);
            expect(t.EmployeeId).to.equal(employee.id);
            expect(t.done).to.equal(false);
        }); 

        it("should not save and return null with invalid Employee", async () => {
            let taskdata = { title: "Work", EmployeeId: null };
            const t = await taskController.saveTask(taskdata);
            expect(t).to.equal(null);
        }); 
    });

    describe("POST - Test for saveBulkTask()", () => {
        it("should save and return bulk Task data with valid Employee", async () => {
            let tasksdata = [
                { title: "Work", EmployeeId: employee.id },
                { title: "Practise", EmployeeId: employee.id },
                { title: "Plan", EmployeeId: employee.id },
                { title: "Revise", EmployeeId: employee.id },
            ];
            const t = await taskController.saveBulkTasks(tasksdata);
            expect(t.length).to.equal(4)
            expect(t[0]).to.have.property("id");
            expect(t[0].title).to.equal(tasksdata[0].title);
            expect(t[0].EmployeeId).to.equal(employee.id);
            expect(t[0].done).to.equal(false);
        }); 
    });

    describe("PUT - Test for updatTask()", () => {
        it("shoudld update and return task data with valid EmployeeId", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            const task = await Tasks.create(taskdata);
            let update = {
                done : true
            };
            let t = await taskController.updateTask(update, {id : task.id, EmployeeId : employee.id});
            expect(t).to.have.property("id");
            expect(t.title).to.equal(taskdata.title);
            expect(t.EmployeeId).to.equal(employee.id);
            expect(t.done).to.equal(true);
        }); 

        it("should not update and return null with invalid Employee", async () => {
            let taskdata = { title: "Work", EmployeeId: null };
            const task = await Tasks.create(taskdata);
            let update = {
                done : true
            };
            let t = await taskController.updateTask(update, {id : task.id, EmployeeId : 1})
            expect(t).to.equal(null);
        }); 
    });

    describe("DELETE - Test for deleteTask()", () => {
        it("shoudld delete task with valid EmployeeId", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            const t = await Tasks.create(taskdata);
            await taskController.deleteTask({id : t.id, EmployeeId : employee.id}); 
            const deletedTask = await Tasks.findOne({where : {id : t.id, EmployeeId : employee.id}});
            expect(deletedTask).to.equal(null);
        }); 

        it("shoudld not delete task with invalid EmployeeId", async () => {
            let taskdata = { title: "Work", EmployeeId: employee.id };
            const t = await Tasks.create(taskdata);
            await taskController.deleteTask({id : t.id, EmployeeId : null}); 
            const deletedTask = await Tasks.findOne({where : {id : t.id, EmployeeId : employee.id}});
            expect(deletedTask.id).to.equal(t.id);
        }); 
    });
});