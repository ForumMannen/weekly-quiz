const fs = require("fs");

function login (req, res) {
    fs.readFile("players.json", async (err, data) => {
        const players = JSON.parse(data);
        const { email, password, playerName } = req.body;
        const player = players.find((user) => user.email === email);

        if(!player || !(await bcrypt.compare(password, player.password))) {
            return res.status(401).json("Wrong email or password");
        }
        res.status(200).json(`${playerName} successfully logged in!`);
    })
};

module.exports = login;