const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db.js");
const Tasks = require("./Tasks.js");

module.exports= (sequelize, DataTypes) => {
sequelize.define("User", {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull :false
    },
    firstName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    lastName : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    email : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
        validate : {
            notEmpty : true
        }
    } 
},
{
    tableName : "NewUser"
});

User.beforeCreate(user => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
});

User.isPassword = (encodedPassword, password) => {
    return bcrypt.compareSync(password, encodedPassword);
};

// User.hasMany(Tasks); or
User.associate = function({Tasks}) {
    User.hasMany(Tasks);
};
// Tasks.belongsTo(User);
console.log(User === sequelize.models.User);
return User;
};