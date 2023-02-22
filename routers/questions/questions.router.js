const express = require("express");
const questionsRouter = express.Router();
const { getData } = require("../../controllers/questions/questions.controller");

questionsRouter.get("/", getData);

module.exports = { questionsRouter };
