const sequelize = require("./db-connectivity.js");
const Tasks = require("./models/Tasks.js");
const User = require("./models/User.js");

sequelize.sync({force : true}).then(() => {
    //Create User
    User.create({ 
        firstName : "Naruto", 
        lastName : "Uzumaki", 
        email : "naruto@ninja.net", 
        password : "9tailfox"
    }).then((data) => {
        console.log("\nUser uploaded :: ",data.id);
        //Bulk Create Tasks
        Tasks.bulkCreate([
            {title : "Work", UserId : data.id},
            {title : "Practise", UserId : data.id},
            {title : "Plan", UserId : data.id},
            {title : "Revise", UserId : data.id},
        ]).then((data) => {
            console.log("\nTasks uploaded :: ", data.length);
        }).catch((err) => {
            console.log("\nerror uploading tasks :: ", err);
        });
    }).catch((err) => {
        console.log("\nerror uploading user :: ", err);
    });
})
.catch((error) => {
    console.log(`Wrong credentials : ${error}`);
});