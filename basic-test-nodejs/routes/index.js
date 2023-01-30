module.exports = app => {
    const fareUtils = require("../public/fareutils.js");

    app.get("/", (_req,res) => {
        res.json({message : "Hello to testing in nodejs!"});
    });
    
    app.post("/calcfare", (req, res) => {
        console.log(req.body);
        let km = parseFloat(req.body.km);
        let min = parseInt(req.body.min);
        console.log(`km : ${km}, min : ${min}`);
        let fared = fareUtils.calcFare(km, min);
        res.send({fare : fared});
    });
    
    app.get("/rate", (req,res) => {
        res.send(fareUtils.rate)
    });
}