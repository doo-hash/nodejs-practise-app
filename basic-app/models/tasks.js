
module.exports = (sequelize, DataTypes) => {
    const Tasks = sequelize.define("Tasks", {
        id : {
            type : DataTypes.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        title : {
            type : DataTypes.STRING,
            allowNull : false,
            validate : {
                notEmpty : true
            }
        },
        done : {
            type : DataTypes.BOOLEAN,
            aloowNull : false,
            defaultValue : false
        }
    },{
        classMethods : {
            associate : (models) => {
                Tasks.belongsTo(models.Users);
            }
        }
    }
    );
    sequelize.sync().then(() => {
        console.log("tasks created")
    }).catch((err) => {
        console.log("error : ", err);
    })
    return Tasks;
};