const { QuestionModel } = require("../../models/questions.models");
const axios = require("axios");
const cron = require("node-cron");

// Cron ska bara schemalägga, den ska inte ligga i en endpoint som anropas.
cron.schedule("25 12 10 02 *", async function fetchAndSaveToMongoDB() {
  try {
    const [response1, response2, response3, response4, response5] =
      await Promise.all([
        axios.get(
          "https://opentdb.com/api.php?amount=5&category=15&type=multiple"
        ),
        axios.get(
          "https://opentdb.com/api.php?amount=5&category=12&type=multiple"
        ),
        axios.get(
          "https://opentdb.com/api.php?amount=5&category=24&type=multiple"
        ),
        axios.get(
          "https://opentdb.com/api.php?amount=5&category=14&type=multiple"
        ),
        axios.get(
          "https://opentdb.com/api.php?amount=5&category=9&type=multiple"
        ),
      ]);
    const fetchedQuestions = [];

    fetchedQuestions.push(response1.data);
    fetchedQuestions.push(response2.data);
    fetchedQuestions.push(response3.data);
    fetchedQuestions.push(response4.data);
    fetchedQuestions.push(response5.data);

    await QuestionModel.deleteMany({});
    console.log("Collection cleared!");

    for (let i = 0; i < fetchedQuestions.length; i++) {
      let currentQuestion = fetchedQuestions[i].results;
      for (let j = 0; j < currentQuestion.length; j++) {
        let question = new QuestionModel({
          category: currentQuestion[j].category,
          type: currentQuestion[j].type,
          difficulty: currentQuestion[j].difficulty,
          question: currentQuestion[j].question,
          correct_answer: currentQuestion[j].correct_answer,
          incorrect_answers: currentQuestion[j].incorrect_answers,
        });
        await question.save();
      }
    }
    console.log(
      `${fetchedQuestions.length} arrays with 5 questions each, inserted into the collection`
    );
  } catch (err) {
    console.error(err);
  }
});

async function getData(req, res) {
  try {
    const questions = await QuestionModel.find().select(
      "-_id -__v -type -incorrect_answers -correct_answer"
    );
    console.log(questions);
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
}

async function getAnswers(req, res) {
  try {
    const questions = await QuestionModel.find().select(
      "_id correct_answer incorrect_answers"
    );
    console.log(questions);
    let allAnswers = [];

    questions.forEach((question) => {
      const { _id, correct_answer, incorrect_answers } = question;
      const mergedAnswers = [correct_answer, ...incorrect_answers];
      const shuffledAnswers = mergedAnswers.sort(() => Math.random() - 0.5);
      allAnswers.push({
        id: _id,
        shuffledAnswers: shuffledAnswers,
      });
    });
    res.status(200).json(allAnswers);
  } catch (error) {
    next(error);
  }
}

module.exports = { getData, getAnswers };
