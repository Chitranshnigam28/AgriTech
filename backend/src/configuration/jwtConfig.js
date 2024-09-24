const crypto = require("crypto")

// Generate random generate key
const scretKey =   crypto.randomBytes(32).toString('hex')

module.exports = {
    secretKey : scretKey
}