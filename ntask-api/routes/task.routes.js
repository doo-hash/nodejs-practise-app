const express = require("express");
const taskRouter = express.Router();
const userController = require("../controller/user.js");
const taskController = require("../controller/task.js");

taskRouter.get("/tasks", async (req, res) => {

    const task = await taskController.getAllTasks({ UserId : 1});
    res.json({
        success : "ok",
        tasks : task
    });
});

module.exports = taskRouter;