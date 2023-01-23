const {Schema, model, models} = require("mongoose");

const playerSchema = new Schema ({
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 8},
    playerName: {type: String, required: true},
    weeklyPlayerScore: {type: Number, required: true},
    totalWeeksPlayed: {type: Number, required: true}
});

const PlayerModel = models.user || model("Players", playerSchema);

module.exports = { PlayerModel };