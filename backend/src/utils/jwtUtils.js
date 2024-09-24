const jwt = require("jsonwebtoken")
const { secretKey } = require("../configuration/jwtConfig")

function generateTokens(user) {
    console.log("user from generateTokens "+user);
    const payload = {
        id: user._id,
        email: user.email,
        role: user.role
    }
        console.log("payload"+payload);
    return ;
}

module.exports = {
    generateTokens
}