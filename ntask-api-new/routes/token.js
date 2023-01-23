const jwt = require("jwt-simple");
const User = require("../models/User.js");

module.exports = app => {
    const config = require("../libs/config.js");
    const Users = require("../models/User.js");

    app.post("/token", (req, res) => {
        if(req.body.email && req.body.password) {
            const email = req.body.email;
            const password = req.body.password;
            Users.findOne({where : {email : email}})
                .then(user => {
                    if(Users.isPassword(user.password, password)){
                        const payload = {id : user.id};
                        res.json({
                            token : jwt.encode(payload, config.jwtSecret)
                        });
                    }
                    else{
                        res.sendStatus(401);
                    }
                })
                .catch(err => {
                    res.sendStatus(401);
                });
        }
        else{
            res.sendStatus(401);
        }
    });
};