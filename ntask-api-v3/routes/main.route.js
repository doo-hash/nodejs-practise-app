const express = require("express");
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

module.exports = mainRouter;