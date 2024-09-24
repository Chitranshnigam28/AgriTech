const User = require("../models/user")

async function getUsers() {
    const users = await User.find({});
}

module.exports = {getUsers}