const bodyParser = require("body-parser");
const passport = require("passport");
require("../auth");

module.exports = app =>{
    app.set("port", 3000);
    app.set("json spaces", 4);
    app.use(bodyParser.json());
    app.use(passport.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
};