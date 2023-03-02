const express = require("express");
const homeRouter = express.Router();

/**
 * @api {get} /API Status
 * @apiGroup Status
 * @apiSuccess {String} status API Status message
 * @apiSuccessExample {json} Success
 * HTTP/1.1 200 OK
 * {
        message : "Welcome to NTask API Project.",
        work : "Let's Do it right NOW!!"
    }
 */
homeRouter.get("/", async (req, res) => {
    res.json({
        message : "Welcome to NTask API Project.",
        work : "Let's Do it right NOW!!"
    });
});

module.exports = homeRouter;
