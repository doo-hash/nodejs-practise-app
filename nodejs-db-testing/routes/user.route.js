const express = require("express");
const router = express.Router();
const controller = require("../controller/user.controller");

router.get("/", controller.getAllUsers);

router.get("/:id", controller.getUser);

router.post("/", controller.postUser);

router.put("/:id", controller.putUser);

router.delete("/:id", controller.deleteUser);

module.exports = router;