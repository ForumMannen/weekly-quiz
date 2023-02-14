const express = require("express");
const playersRouter = express.Router();
const {
  getAllPlayers,
  createPlayer,
  login,
  logout,
} = require("../../controllers/players/players.controller");
const { validate } = require("../../middleware");
const { playerJoiSchema } = require("../../models/players.models");

playersRouter.get("/", getAllPlayers);

playersRouter.post("/register", validate(playerJoiSchema), createPlayer);
playersRouter.post("/login", validate(playerJoiSchema), login);
playersRouter.post("/logout", logout);
module.exports = { playersRouter };
