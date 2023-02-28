const express = require("express");
const { ensureNotAuthenticated, ensureAuthenticated } = require("../lib/auth.js");
const loginRouter = express.Router();
const passport = require("../passport-auth.js");

loginRouter.post("/login", ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate('local',{
        successReturnToOrRedirect : "/tasks",
        failureRedirect : "/"
    })(req, res, next);
});

loginRouter.post("/logout", ensureAuthenticated, (req, res, next) => {
    delete req.session.verified;
    delete req.session.method;
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        res.redirect('/');
    });
});
module.exports = loginRouter;