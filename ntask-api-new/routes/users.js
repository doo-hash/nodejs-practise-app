const passport = require("passport");

module.exports = app => {

    const config = require("../libs/config.test.js");
    const Users = require("../models/User.js");
    app.route("/user")
        .all(passport.authenticate("jwt", config.jwtSession))
        .get((req, res) => {
            Users.findById(req.params.id, {
                attributes:["id", "firstName", "lastName", "email"]
            })
            .then((result) => {
                res.json(result);
            })
            .catch(error => {
                res.status(412).json({msg : error.message});
            });
        })
        .delete((req, res) => {
            Users.destroy({where : {id : req.params.id}})
                .then(result => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        });

    app.post("/users", (req, res) => {
        Users.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            res.status(412).json({msg : error.message});
        });
    });
};