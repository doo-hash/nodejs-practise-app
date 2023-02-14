const express = require("express");
const passport = require("passport");

const app = express();
app.use(passport.initialize());
require("./libs/middlewares.js")(app);
require("./routes/index.js")(app);
require("./routes/token.js")(app);



require("./routes/tasks.js")(app);
require("./routes/users.js")(app);
require("./libs/boot.js")(app);
module.exports = app;

// consign({verbose : false})
//     .include("libs/config.development.js")
//     .then("db.js")
//     .then("auth.js")
//     .then("/libs/middlewares.js")
//     .then("routes")
//     .then("libs/boot.js")
//     .into(app);
