const express = require("express");
const router = express.Router();
const login = require("../../controllers/login/login.controller");

router.post("/", login);

module.exports = router;