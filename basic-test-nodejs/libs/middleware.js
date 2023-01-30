module.exports = app => {
    const express = require("express");
    const path = require("path");
    app.use(express.json());
    // or app.use(bodyParser.json());
    app.use(express.urlencoded({extended : true}));
    // or app.use(express.urlencoded({extended : false}));
    app.use("/", express.static(path.join(__dirname,'public')));
    // or app.use(express.static(path.join(__dirname,'public')));

    app.set("json spaces", 4);
    app.set("port", 3000);
}