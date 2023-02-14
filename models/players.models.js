const { Schema, model, models } = require("mongoose");
const Joi = require("joi");

const playerSchema = new Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, minLength: 8 },
    playerName: { type: String, required: true },
    weeklyPlayerScore: { type: Number, required: true },
    totalWeeksPlayed: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestams: true,
  }
);

const playerJoiSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().strict().min(8).required(),
  playerName: Joi.string().min(3).required(),
  weeklyPlayerScore: Joi.number(),
  totalWeeksPlayed: Joi.number(),
  isAdmin: Joi.boolean().default(false),
});

const PlayerModel = models.user || model("Players", playerSchema);

module.exports = { PlayerModel, playerJoiSchema };
