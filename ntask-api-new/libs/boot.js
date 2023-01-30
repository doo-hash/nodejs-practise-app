module.exports= app => {
    console.log(process.env.NODE_ENV);
    if(process.env.NODE_ENV !== "test"){
        const sequelize = require("../db.js");

        sequelize.sync(
            // {force :true}
            )
            .then((result) => {
                app.listen(app.get("port"), () => {
                    console.log(`listening on port ${app.get("port")}`);
                });
                console.log("Result :: ", result);
            })
            .catch((error) => {
                console.log("error occured : ", error);
            });
    }
};