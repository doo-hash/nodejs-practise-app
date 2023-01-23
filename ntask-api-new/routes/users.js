const { Passport } = require("passport");
require("../auth.js");
const Users = require("../models/User.js");

module.exports = app => {

    app.route("/user")
        .all(app.auth.authenticate())
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
        console.log(req.body);
        Users.create(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch(error => {
            res.status(412).json({msg : error.message});
        });
    });
};