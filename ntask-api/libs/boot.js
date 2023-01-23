module.exports = app =>{
    // app.db.sequelize.sync().done(() => {
    //     app.listen(app.get("port"), () => {        
    //         console.log(`NTask API - port ${app.get("port")}`);
    //     });      
    // })
    const sequelize = app.db.sequelize;
    sequelize.sync({force :true})
        .then((result) => {
            app.listen(app.get("port"), () => {
                console.log(`listening on port ${app.get("port")}`);
            });
            console.log("Result :: ", result);
        })
        .catch((error) => {
            console.log("error occured : ", error);
        });
        console.log("connected");
};