const express = require("express");
const userRouter = express.Router();
const userController = require("../controller/user.js");

userRouter.post("/users/register", async (req, res) => {
    const {firstName, lastName, email, password} = req.body;
    const user = await userController.getUser({email : email});

    if(!user){
        const newUser = await userController.createUser({firstName, lastName, email, password});
        res.status(200).json({
            user : newUser,
            message : "User registered successfully",
            prompt : "You can create your tasks now!!"
        });
    }
    res.status(200).json({
        message : "User already exists with email : " + email,
        suggestion : "Register with another email account"
    });
});

userRouter.put("/users/:id", async (req, res) => {

    const {firstName, lastName, email, password} = req.body;
    const user = await userController.getUser({id : req.body.id});

    if(user){
        console.log("User : ", JSON.stringify(req.body));
        const updateUser = userController.updateUser({firstName, lastName, email, password});
        res.status(200).json({
            user : updateUser,
            message : "User updated successfully",
            prompt : "You can create or edit your tasks now!!"
        });
    }
    res.status(404).json({
        message : "User not found with id : " + id,
        suggestion : "Create an account"
    });
});

userRouter.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userController.getUserWithTasks({id : id});

    if(!user){
        res.status(404).json({
            message : "No User Found",
            prompt : "You can register youself now!"
        });
    }
    res.status(200).json({
        success : "ok",
        user : user
    });
});

userRouter.get("/users", async (req, res) => {
    const users = await userController.getAllUsers();
    console.log(users);
    if(!users){
        res.status(404).json({
            message : "No Users",
            users : users
        });
    }
    res.status(200).json({
        success : "ok",
        users : users
    });
});

userRouter.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    const user = await userController.deleteUser({id : id});

    if(!user){
        res.status(404).json({
            message : "No User Found"
        });
    }
    res.status(200).json({
        success : "ok",
        message : user.userName + " deleted successfully:("
    });
});

module.exports = userRouter;