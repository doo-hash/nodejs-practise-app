module.exports = app =>{
    // const Tasks = app.models.tasks;
    const Tasks = app.db.models.Tasks;
    app.get("/tasks", (req, res) => {
        Tasks.findAll({}, (tasks) => {
            res.json({tasks : tasks});
        });
        // res.json({
            // tasks : [
            //     {title : "Buy some books"},
            //     {title : "Fix notebook"}
            // ]
        // });
    });
};