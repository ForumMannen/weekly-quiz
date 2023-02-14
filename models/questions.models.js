const { Schema, model, models } = require("mongoose");

const questionSchema = new Schema({
  category: { type: String, required: true },
  type: { type: String, required: true },
  difficulty: { type: String, required: true },
  question: { type: String, required: true },
  correct_answer: { type: String, required: true },
  incorrect_answers: { type: Array, required: true },
});

const QuestionModel = models.question || model("Questions", questionSchema);

module.exports = { QuestionModel };
