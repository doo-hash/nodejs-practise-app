module.exports = (sequelize, DataType) => {
    const Users = sequelize.define("Users", {
        id : {
            type : DataType.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        name : {
            type : DataType.STRING,
            allowNull : false,
            validate : {
                motEmpty : true
            }
        },
        password : {
            type : DataType.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        email : {
            type : DataType.STRING,
            unique : true,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        }
    }, {
        clasMethods : {
            assocoate : (models) => {
                Users.hasMany(models.Tasks);
            }
        }
    });
    sequelize.sync().then(() => {
        console.log("tasks created")
    }).catch((err) => {
        console.log("error : ", err);
    })
    return Users;
};