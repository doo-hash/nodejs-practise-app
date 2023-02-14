const User = require("./user.js");

const createUser = async ({full_name, username, password}) => {
    return await User.create({full_name, username, password});
};

const getAllUsers = async () => {
    return await User.findAll();
};

const getUser = async obj => {
    return await User.findOne({
        where : obj
    });
};

module.exports = {
    createUser,
    getAllUsers,
    getUser
};