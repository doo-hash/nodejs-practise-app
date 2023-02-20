const User = require("../models/User.js");

const getAllUsers = async () => {
    const users = await User.findAll({where : {}});
    return users;
};

const getUser = async (dataobj) => {
    const user = await User.findOne({where : dataobj});
    if(user){
        console.log("user deleted : ",user.inActive);
        if(!user.inActive){
            return user;
        }    
    }
    return null;
};

const getUserWithTasks = async (dataobj) => {
    const user = await User.findOne({where : dataobj, include : "tasks"});
    if(user){
        if(!user.inActive){
            return user;
        }    
    }
    return null;
};

const createUser = async (userData) => {
    const user = await User.create(userData);
    return user;
};

const updateUser = async (userData, idObj) => {
    await User.update(userData,{where : idObj});
    const updateUser = await User.findOne({where : idObj});
    return updateUser;
};

const deleteUser = async (dataobj) => {
    // await User.destroy({where : dataobj});
    await User.update({ inActive : true },{where : dataobj});
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserWithTasks,
    updateUser,
    deleteUser
}