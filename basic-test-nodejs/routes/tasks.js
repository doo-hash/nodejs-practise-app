module.exports = app => {
    app.get("/tasks", (req, res) => {
        res.json({tasks : {
            id : 1,
            title : "sleep"
        }});
    })
}