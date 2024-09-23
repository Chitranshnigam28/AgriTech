const jwt = require("jsonwebtoken")
const { secretKey } = require("../configuration/jwtConfig")

function generateTokens(user) {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, secretKey, { expireIn: "1h" });
}

module.exports = {
    generateTokens
}