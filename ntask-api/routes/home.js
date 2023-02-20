const express = require("express");
const homeRouter = express.Router();

homeRouter.get("/", async (req, res) => {
    res.json({
        message : "Welcome to NTask API Project.",
        work : "Let's Do it right NOW!!"
    });
});

module.exports = homeRouter;
