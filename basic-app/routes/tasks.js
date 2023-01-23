module.exports = app => {
    const tasks = app.db.models.Tasks;
    app.get("/tasks", (req, res) => {
        tasks.findAll({}).then(tasks => {
            res.json({tasks : tasks});
        });
    });
};