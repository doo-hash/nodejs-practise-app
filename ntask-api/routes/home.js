const express = require("express");
const Tasks = require("../models/Tasks");
const User = require("../models/User");
const router = express.Router();

router.get("/", async (req, res) => {
    const user = await User.findAll({include : "tasks"});
    const task = await Tasks.findOne({where : {id : 2}});
    res.json({
        message : "Welcome to NTask API Project.",
        work : "Let's Do it right NOW!!",
        user : user,
        task : task
    });
});

module.exports = router;
