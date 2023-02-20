const express = require("express");
const questionsRouter = express.Router();
const {
  getData,
  getAnswers,
} = require("../../controllers/questions/questions.controller");

questionsRouter.get("/", getData);
questionsRouter.get("/answers", getAnswers);

module.exports = { questionsRouter };
