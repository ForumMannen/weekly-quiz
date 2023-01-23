const express = require("express");
const router = express.Router();
const { getData } = require("../../controllers/questions/questions.controller");

router.get("/", getData)

module.exports = router;