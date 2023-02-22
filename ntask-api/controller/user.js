const User = require("../models/User.js");

const getAllUsers = async () => {
    const users = await User.findAll({where : {}});
    if(users == ""){
        return null;
    }
    return users;
};

const getUser = async (dataobj) => {
    const user = await User.findOne({where : dataobj});
    if(user){
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
    const user = await User.findOne({where : idObj});
    if(user){
        await User.update(userData,{where : idObj});
        const updateUser = await User.findOne({where : idObj});
        return updateUser;
    }
    return null;
};

const deleteUser = async (dataobj) => {
    // await User.destroy({where : dataobj});
    const user = await User.findOne({where : dataobj});
    if(user){
        if(!user.inActive){
            console.log("user found with : ", user.inActive);
            await User.update({ inActive : true },{where : dataobj});
            const deletedUser = await User.findOne({where : dataobj});
            return deletedUser;
        }    
    }
    return null;
};

module.exports = {
    createUser,
    getAllUsers,
    getUser,
    getUserWithTasks,
    updateUser,
    deleteUser
}