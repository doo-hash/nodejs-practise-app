const passport = require("passport");
const Tasks = require("../models/Tasks.js");
let config = null;
const env = process.env.NODE_ENV;
if(env != null){
    config = require(`../libs/config.${env}.js`);
}

module.exports = app => {
    // app.get("/tasks", async (req, res) => {
    //     const tasks = await Tasks.findAll();
    //     res.json({currenttasks : tasks});
    // });
    //ADDING CRUD API

    app.route("/tasks")
        .all(passport.authenticate("jwt", {session : false}))
        .get((req, res) => {
            console.log("here iam")
            Tasks.findAll({
                where : { user_id : req.user.id }
            })
                .then(result => {
                    console.log("Tasks : ", result);
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        })
        .post((req, res) => {
            req.body.user_id = user.id;
            console.log("body : ", req.body);
            Tasks.create(req.body)
                .then(result => {
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        });

    app.route("/tasks/:id")
        .all(passport.authenticate("jwt", {session : false}))
        .get((req, res) => {
            Tasks.findOne({where : {
                    id : req.params.id,
                    user_id : req.user.id
                    }   
                })
                .then((result) => {
                    if(result) {
                        res.json(result);
                    }else{
                        res.sendStatus(404);
                    }
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        })
        .put((req, res) => {
            Tasks.update(req.body, {where : 
                    { 
                        id : req.params.id,
                        user_id : req.user.id
                    }
                })
                .then((result) => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        })
        .delete((req, res) => {
            console.log(req.params);
            Tasks.destroy({where : 
                {
                    id : req.params.id,
                    user_id : req.user.id
                }
            })
            .then((result) => {
                console.log("result: ", result);
                res.sendStatus(204);
            })
            .catch(error => {
                res.status(412).json({msg : error.message});
            });
        });
};