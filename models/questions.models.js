const {Schema, model, models} = require("mongoose");

const questionSchema = new Schema ({
    category: {type: String, required: true, default: 'uncategorized'},
    difficulty: {type: String},
    question: {type: String, required: true, default: 'undefined'},
    correctAnswer: {type: String, required: true, default: 'undefined'},
    incorrectAnswers: {type: String, required: true, default: 'undefined'}
});

const QuestionModel = models.question || model("Questions", questionSchema);

module.exports = { QuestionModel };