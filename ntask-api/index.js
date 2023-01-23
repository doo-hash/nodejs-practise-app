import consign from "consign";
import express from "express";

const app = express();

consign()
    .include("libs/config.js")
    .then("db.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);