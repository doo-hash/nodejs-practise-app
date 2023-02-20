const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mypassport = require("./passport-auth.js");

const myapp = express();
myapp.use(passport.initialize());

myapp.set("port",3000);
myapp.set("json spaces", 4);
myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({ extended : true }));


const mainRouter = require("./routes/home.js");
const userRouter = require("./routes/user.routes.js");
const taskRouter = require("./routes/task.routes.js");


myapp.use(mainRouter);
myapp.use(userRouter);
myapp.use(taskRouter);

myapp.listen(myapp.get("port"), () => {
    console.log(`Listening on port ${myapp.get("port")}`);
});

module.exports = myapp;