const Tasks = require("../models/Tasks.js");

module.exports = app => {
    app.get("/tasks", async (req, res) => {
        const tasks = await Tasks.findAll();
        res.json({currenttasks : tasks});
    })
}