const express = require("express");
const { ensureNotAuthenticated, ensureAuthenticated } = require("../lib/auth");
const sampleDbData = require("../sampleDbData");
const mainRouter = express.Router();

/**
 * @api {get} /API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status message
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
                success : "ok",
                message : "All is Well. You Can Start NOW",        
            }
 */
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
            res.json({
                message : "You need to login to go further",        
            });
});

mainRouter.get("/sample",ensureNotAuthenticated, async (req, res, next) => {
        // const { employees, tasks } = await sampleDbData();
            res.json({
                message : "You cannot see this page when you are logged in",        
            });
                
});

mainRouter.get("/protected",ensureAuthenticated, async (req, res, next) => {
            res.json({
                Employee  : req.user.id,        
            });
});

module.exports = mainRouter;