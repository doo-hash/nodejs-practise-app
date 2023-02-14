const jwt = require("jwt-simple");

module.exports = app => {
    let config = null;
    const env = process.env.NODE_ENV;
    if(env != null){
        config = require(`../libs/config.${env}.js`);
    }
    const Users = require("../models/User.js");

    app.post("/token", (req, res) => {
        if(req.body.email != null && req.body.password != null) {
            const email = req.body.email;
            const password = req.body.password;

            Users.findOne({where : {email : email}})
                .then(user => {
                    if(Users.isPassword(user.password, password)){
                        let payload = {id : user.id};
                        let token = jwt.encode(payload, config.jwtSecret);
                        res.json({
                            token : token,
                            msg : "Token generated successfully"
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