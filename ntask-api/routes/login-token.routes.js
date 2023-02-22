const tokenRouter = require("express").Router();
const userController = require("../controller/user.js");
const jwt = require("jwt-simple");
const mypassport = require("../passport-auth.js");
const bcrypt = require("bcrypt");

tokenRouter.post("/login", async (req, res, next) => {
    const {email, password} = req.body;
    if(email && password){
        let user = await userController.getUser({email});
        if(user){
            const validPassword = await bcrypt.compare(password,user.password);
            if(validPassword){
                let payload = {id : user.id};
                let token = jwt.encode(payload,mypassport.jwtOptions.secretOrKey);
                res.json({message : "ok", token : token});
            }
            else{
                res.status(401).json({message : "Password is incorrect"});
            }
        }
        else{
            res.status(401).json({
                message : "No such user found"
            });
        }
    }
    else{
        res.status(401).json({
            message : "email and password are required"
        });
    } 
});

module.exports = tokenRouter;