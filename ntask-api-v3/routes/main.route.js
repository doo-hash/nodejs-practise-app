const express = require("express");
const { ensureNotAuthenticated } = require("../lib/auth");
const sampleDbData = require("../sampleDbData");
const mainRouter = express.Router();

mainRouter.get("/", async (req, res, next) => {
    try {
        // const { employees, tasks } = await sampleDbData();
            res.json({
                success : "ok",
                message : "All is Well. You Can Start NOW",        
            });
                
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

mainRouter.get("/home", ensureNotAuthenticated, async (req, res, next) => {
    try {
        // const { employees, tasks } = await sampleDbData();
            res.json({
                message : "You need to login to go further",        
            });
                
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

mainRouter.get("/sample",ensureNotAuthenticated, async (req, res, next) => {
    try {
        // const { employees, tasks } = await sampleDbData();
            res.json({
                message : "You cannot see this page when you are logged in",        
            });
                
    } catch (error) {
        console.log(error.message);
        next(error);
    }
});

module.exports = mainRouter;