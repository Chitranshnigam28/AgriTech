const user = require("../models/user")
const userService = require("../services/user")

async function getUsers(req, res) {
    try {
        const users = await userService.getUsers(); 
        res.json(users)
    } catch (error) {
        req.status(500).json({ message: error })
    }
};

module.exports = { getUsers }