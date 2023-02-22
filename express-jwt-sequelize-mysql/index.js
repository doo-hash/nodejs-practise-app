const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const mypassport = require("./passport-auth.js");

const mytestingapp = express();

mytestingapp.use(passport.initialize());
mytestingapp.use(bodyParser.json());
mytestingapp.use(bodyParser.urlencoded({ extended : true }));

//since its there in user.js model.
//const sequelize = require("./db-connectivity.js");
//since its there in user-routes
//const User = require("./user.js");
const userRoutes = require("./user-routes.js");

mytestingapp.get('/', function(req, res){
    res.json({ message : "Express is up! Let's Go" });
});

mytestingapp.post('/register', function(req, res, next){
    const {full_name, username, password} = req.body;
    userRoutes.createUser({full_name, username, password})
                .then((user) => {
                    res.json({user, msg : "account created successfully"});
                })
                .catch(error => {
                    console.log("error creating an account : ", error);
                    res.json({msg : "error in creating an account"});
                });
                
});

mytestingapp.get('/users', function(req, res, next){
    userRoutes.getAllUsers().then((user) => {
        res.json(user);
    })
    .catch(error => {
        console.log("error in fetching users : ", error);
        res.json({msg : "error in fetching users list"});
    });
});

mytestingapp.post('/login', async function(req, res, next) {
    const{username, password} = req.body;

    if(username && password){
        let user = await userRoutes.getUser({ username });

        if(!user){
            res.status(401).json({msg : 'No such user found : ',user});
        }
        if(user.password === password){
            let payload = {id : user.id};
            let token = jwt.sign(payload, mypassport.jwtOptions.secretOrKey);
            res.json({msg : 'ok', token : token});
        }
        else{
            res.status(401).json({msg : 'Password is incorrect'});
        }
    }
});

mytestingapp.get('/protected', passport.authenticate('jwt', {session : false}), function(req, res){
    res.json({msg : "Congrats! you are seeing this bcz you are authorized"});
});

mytestingapp.listen(3000, function(){
    console.log("Express is running on port 3000. Stay tuned!");
});

module.exports = mytestingapp;
