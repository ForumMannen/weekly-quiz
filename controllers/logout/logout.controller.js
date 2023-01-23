function logout(req, res) {
    res.status(200).json("Successfully logged out!")
}

module.exports = logout;