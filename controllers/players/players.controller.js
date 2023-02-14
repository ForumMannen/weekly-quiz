const { PlayerModel } = require("../../models/players.models");
const bcrypt = require("bcrypt");

async function getAllPlayers(req, res, next) {
  try {
    const players = await PlayerModel.find();
    console.log(players);
    const playersToSend = [];
    for (player of players) {
      const playerToSend = {
        playerName: player.playerName,
        weeklyPlayerScore: player.weeklyPlayerScore,
        totalWeeksPlayed: player.totalWeeksPlayed,
      };
      playersToSend.push(playerToSend);
    }
    res.status(200).json(playersToSend);
  } catch (error) {
    next(error);
  }
}

async function createPlayer(req, res, next) {
  try {
    const user = await PlayerModel.findOne({ playerName: req.body.playerName });
    if (user) {
      return res.status(409).json("That playername is already taken!");
    }
    const {
      _id,
      email,
      password,
      playerName,
      weeklyPlayerScore,
      totalWeeksPlayed,
      isAdmin,
    } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newPlayer = await PlayerModel.create({
      _id,
      email,
      password: hashedPassword,
      playerName,
      weeklyPlayerScore,
      totalWeeksPlayed,
      isAdmin,
    });
    newPlayer.save();
    const strippedPlayer = {
      playerName: newPlayer.playerName,
      weeklyPlayerScore: newPlayer.weeklyPlayerScore,
      totalWeeksPlayed: newPlayer.totalWeeksPlayed,
      isAdmin: newPlayer.isAdmin,
    };
    return res.status(201).json(strippedPlayer);
  } catch (error) {}
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const player = await PlayerModel.findOne({
      email: email,
    });

    if (!player || !(await bcrypt.compare(password, player.password))) {
      return res.status(401).json("Wrong username or password");
    }
    req.session = player;
    res.status(200).json({
      _id: player.id,
      playerName: player.playerName,
      email: player.email,
      isAdmin: player.isAdmin,
    });
  } catch (error) {
    next(error);
  }
}

async function logout(req, res, next) {
  try {
    req.session = null;
    res.status(204).json("Succesfully logged out");
  } catch (error) {
    next(error);
  }
}

module.exports = { getAllPlayers, createPlayer, login, logout };
