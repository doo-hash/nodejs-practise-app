const express = require("express");
const taskRouter = express.Router();
const taskController = require("../controller/task.js");
const passport = require("passport");
const jwt = require("jwt-simple");
const mypassport = require("../passport-auth.js");

taskRouter.get("/tasks", passport.authenticate('jwt', { session : false }), async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const user_id = jwt.decode(token, mypassport.jwtOptions.secretOrKey).id;
    const tasks = await taskController.getAllTasks({ UserId : user_id});
    res.json({
        success : "ok",
        user_id,
        tasks : tasks
    });
});

taskRouter.get("/tasks/:id", passport.authenticate('jwt', { session : false }), async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const user_id = jwt.decode(token, mypassport.jwtOptions.secretOrKey).id;
    const task = await taskController.getTask({UserId : user_id, id : req.params.id});
    res.json({
        success : "ok",
        user_id,
        task : task
    });
});

taskRouter.post("/tasks", passport.authenticate('jwt', {session : false}), async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const user_id = jwt.decode(token, mypassport.jwtOptions.secretOrKey).id;
    console.log(req.body.title)
    const createTask = { title : req.body.title, UserId : user_id};
    const  task = await taskController.createTask(createTask);
    res.json({
        success : "ok",
        user_id,
        task : task
    });
})

taskRouter.put("/tasks/:id", passport.authenticate('jwt', {session : false}), async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const user_id = jwt.decode(token, mypassport.jwtOptions.secretOrKey).id;
    const updateTask = { title : req.body.title, done : req.body.done};
    const task = await taskController.updateTask(updateTask, {id : req.params.id, UserId : user_id});
    res.json({
        success : "ok",
        user_id,
        task : task
    });
});

taskRouter.delete("/tasks/:id", passport.authenticate('jwt', {session : false}), async (req, res) => {
    const token = req.header("Authorization").split(" ")[1];
    const user_id = jwt.decode(token, mypassport.jwtOptions.secretOrKey).id;
    await taskController.deleteTask({id : req.params.id, UserId : user_id});
    res.json({
        success : "ok"
    });
});
module.exports = taskRouter;