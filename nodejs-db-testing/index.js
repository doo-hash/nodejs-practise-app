const express = require("express");
const mongoose  = require("mongoose");
const createError = require("http-errors");

const app = express();

app.set("port", 3000);
app.set("json spaces", 4);
app.use(express.urlencoded({extended : true}));

mongoose.connect("mongodb://localhost/testDB", {
    useNewUrlParser : true
})
.then(() => {
    console.log("connected");
})
.catch((err) => {
    console.log("failed to connect : ", err);
    process.exit();
})

 const mainRouteer = require("./routes/index.js");
 const usersRouter = require("./routes/user.route.js");
 app.use("/", mainRouteer);
 app.use("/api/users", usersRouter);

app.use((req, res, next) => {
    next(createError(404));
});

app.use(function(err, req, res, next){
    res.locals.message = err.message;

    res.status(err.status || 500);
    res.send(err);
});

app.listen(app.get("port"), () => {
    console.log(`listening on server ${app.get("port")}.`);
});

module.exports = app;