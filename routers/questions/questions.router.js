const express = require("express");
const questionsRouter = express.Router();
const {
  getData,
  correctAnswer,
} = require("../../controllers/questions/questions.controller");

questionsRouter.get("/", getData);
questionsRouter.post("/", correctAnswer);

module.exports = { questionsRouter };
