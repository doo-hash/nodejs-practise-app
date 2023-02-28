const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

const myapp = express();

myapp.use(session({
    secret:'samplesession',
    saveUninitialized: true,
    resave: true,
    cookie : {maxAge : 60 * 60 *1000 }
}));

myapp.use(passport.initialize());
myapp.use(passport.session());

myapp.set("port", 3000);
myapp.set("json spaces", 4);
myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({extended : true}));


const mainRouter = require("./routes/main.route.js");
const employeeRouter = require("./routes/employee.route.js");
const loginRouter = require("./routes/login.route.js");
const taskRouter = require("./routes/tasks.route.js");

myapp.use(mainRouter);
myapp.use(employeeRouter);
myapp.use(loginRouter);
myapp.use(taskRouter);

myapp.use((error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    console.log(error)
    res.status(error.status || 500).json({
        status : 'error',
        error : {
            message : error.message 
        }
    });
});

myapp.listen(3000, () => {
    console.log(`Listening on port : 3000`);
});

module.exports = myapp;