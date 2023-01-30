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
    let user = await User.findById(id);
    if(!user) return res.status(404).send("User not found");
    return res.send(user);
}

module.exports = {
    getAllUsers, getUser
}