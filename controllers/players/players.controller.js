const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const bcrypt = require("bcrypt");

function getAllPlayers(req, res){
    fs.readFile("players.json", (err, data) => {
        if(err){
           return res.status(404).json("Couldn't find Players!");
        }
        const allPlayers = JSON.parse(data)

        res.status(200).json(allPlayers)
        return;
    })
}

function createPlayer(req, res){
    fs.readFile("players.json", async (err, data) => {
        const userData = JSON.parse(data)
        const specificUser = userData.find((user) => user.playerName === req.body.playerName);
        
        if(specificUser){
            return res.status(409).json("There is already a Player with that name!");
        }
        
        let uuid = uuidv4();
        const { email, password, playerName, weeklyPlayerScore, totalWeeksPlayed } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newPlayer = {
            id: uuid,
            email,
            password: hashedPassword,
            playerName,
            weeklyPlayerScore,
            totalWeeksPlayed
        }
        
        userData.push(newPlayer);

        fs.writeFile("players.json", JSON.stringify(userData, null, 2),(err) => {
            if(err){
                res.status(404).json("Couldn't write to file")
                return;
            }
            res.status(201).json(userData);
        })
    })
}

module.exports = { getAllPlayers, createPlayer };