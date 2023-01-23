const { application } = require("express");
const Tasks = require("../models/Tasks.js");

module.exports = app => {
    // app.get("/tasks", async (req, res) => {
    //     const tasks = await Tasks.findAll();
    //     res.json({currenttasks : tasks});
    // });

    //ADDING CRUD API
    app.route("/tasks")
        .get((req, res) => {
            Tasks.findAll()
                .then(result => {
                    console.log("Tasks : ", result);
                    res.json(result);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        })
        .post((req, res) => {
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
        .get((req, res) => {
            Tasks.findOne({where : req.params})
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
            Tasks.update(req.body, {where : req.params})
                .then((result) => {
                    res.sendStatus(204);
                })
                .catch(error => {
                    res.status(412).json({msg : error.message});
                });
        })
        .delete((req, res) => {
            console.log(req.params);
            Tasks.destroy({where : req.params})
            .then((result) => {
                console.log("result: ", result);
                res.sendStatus(204);
            })
            .catch(error => {
                res.status(412).json({msg : error.message});
            });
        });
};