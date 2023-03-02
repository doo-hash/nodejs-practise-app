const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const mypassport = require("./passport-auth.js");
const cors = require("cors");
const logger = require("./libs/logger.js");
const morgan = require("morgan");
const compression = require("compression");

const myapp = express();
myapp.use(passport.initialize());

myapp.set("port",3000);
myapp.set("json spaces", 4);
myapp.use(bodyParser.json());
myapp.use(bodyParser.urlencoded({ extended : true }));
myapp.use(express.static("public"));
myapp.use(morgan("common", {
    stream : {
        write : (message) => {
            logger.info(message);
        }
    }
}));
myapp.use(cors({
    origin : ["http://localhost:3001"],
    methods : ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders : ["Content-Type", "Authorization"]
}));
myapp.use(compression());
// require("./sampleDataupload.js");

const mainRouter = require("./routes/home.js");
const userRouter = require("./routes/user.routes.js");
const taskRouter = require("./routes/task.routes.js");
const tokenRouter = require("./routes/login-token.routes.js");

myapp.use(mainRouter);
myapp.use(userRouter);
myapp.use(taskRouter);
myapp.use(tokenRouter);

myapp.listen(myapp.get("port"), () => {
    console.log(`Listening on port ${myapp.get("port")}`);
});

module.exports = myapp;