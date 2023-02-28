const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controller/taskController.js");
const {ensureAuthenticated} = require("../lib/auth.js");

taskRouter.get("/tasks", ensureAuthenticated, async (req, res) => {
    const employee = req.user;
    let tasks = await taskController.findAllforEmp({EmployeeId : employee.id});
        if(!tasks){
            res.json({
                message : "No tasks found with employee : " + employee.id
            })
        }  
        else{
            res.json({
                success : "ok",
                tasks : tasks,
                employee : employee
            });        
        }  
});

taskRouter.get("/tasks/:id", ensureAuthenticated, async (req, res) => {
    const employee = req.user;
    const taskId = req.params.id;
    let task = await taskController.findTask({id : taskId, EmployeeId : employee.id});
        if(!task){
            res.json({
                message : "task not found. You might have deleted it"
            })
        }  
        else{
            res.json({
                success : "ok",
                task : task,
                employee : employee
            });        
        }  
});

taskRouter.post("/tasks/add", ensureAuthenticated, async (req, res) => {
    const employee = req.user;
    const {title, done} = req.body;
    const task = await taskController.saveTask({title : title, done : done, EmployeeId : employee.id});
    res.json({
        success : "ok",
        task : task,
        Employee : employee
    });
});

taskRouter.put("/tasks/:id", ensureAuthenticated, async (req, res) => {
    const employee = req.user;
    const taskId = req.params.id;
    const {title, done} = req.body;
    const task = await taskController.updateTask({title : title, done : done}, {id : taskId, EmployeeId : employee.id});
    if(!task){
        res.json({
            message : "This task was not found. You might have deleted it"
        })        
    }
    else{
        res.json({
            success : "ok",
            task : task,
            Employee : employee
        });    
    }
});

taskRouter.delete("/tasks/:id", ensureAuthenticated, async (req, res) => {
    const employee = req.user;
    const taskId = req.params.id;
    await taskController.deleteTask({id : taskId, EmployeeId : employee.id});
    const tasks = await taskController.findAllforEmp({EmployeeId : employee.id});
    res.json({
        success : "ok",
        tasks : tasks,
        Employee : employee
    })
})
module.exports = taskRouter