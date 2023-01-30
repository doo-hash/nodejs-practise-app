module.exports = app => {
    app.listen(app.get("port"), () => {
        console.log(`server started on http://localhost:3000`);
    });
}