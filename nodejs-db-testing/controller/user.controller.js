const mongoose = require("mongoose");
const { User } = require("../models/user.model");

const getAllUsers = async (req, res) => {
    const users = await User.find();
    return res.send(users);
};

const getUser = async (req, res) => {
    let userId = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(userId)){
        return res.status(400).send("Invalid Object id");
    }
    let user = await User.findById({
        _id : userId
    });
    if(!user) return res.status(404).send("User not found");
    return res.send(user);
}

const postUser = async (req, res) => {
    console.log("request body : ", req.body);
    const user = new User({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender
    });
    await user.save();
    console.log(user)
    return res.send(user);
}

const putUser = async (req, res) => {
    //set new to true to return the doc after update
    //it fails when using then catch block for this -- check
    const user = await User.findOneAndUpdate(
        { _id : req.params.id},
        {
            name : req.body.name,
            email : req.body.email,
            gender : req.body.gender
        }, 
        {new : true});
        return res.send(user);
}

const deleteUser = async (req, res) => {
    await User.findByIdAndDelete({
        _id : req.params.id
    });
    return res.send("User deleted");
}

module.exports = {
    getAllUsers, getUser, postUser, putUser, deleteUser
}