const express = require("express");
const loginRouter = express.Router();
const passport = require("passport");

loginRouter.post("/login", (req, res, next) => {
    passport.authenticate('local',{
        successReturnToOrRedirect : "/"
    })(req, res, next);
});

module.exports = loginRouter;