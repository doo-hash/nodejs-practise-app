module.exports = app =>{
    app.get("/", (req,res) => {
        res.json({status : "All Good Right NoW!!!!"});
    });
}