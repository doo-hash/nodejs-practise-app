import consign from "consign";
import express from "express";

const app = express();

consign()
    .include("libs/config.js")
    .include("db.js")
    .then("libs/middleware.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);