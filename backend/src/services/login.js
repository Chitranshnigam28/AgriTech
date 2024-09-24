const bcrypt = require("bcrypt")
const User = require("../models/user")
const { generateTokens } = require("../utils/jwtUtils")
const { verifyToken } = require("../utils/authMiddleware")

async function login(email, password) {
  try {
    const extingUser = await User.findOne({ email });
    console.log("async function login"+ email, password)
    console.log(extingUser)
    if (!extingUser) {
      throw new Error("User not found");
    }
    const isPasswordValid = await bcrypt.compare(password, extingUser.password)
    console.log(isPasswordValid)
    if (!isPasswordValid) {
      throw new Error("Incorrect Password");
    }
    const token = generateTokens(extingUser)
    console.log(token)
    return token
  } catch (error) {
    throw new Error("Invalid Credentials");
  }

}

async function refreshToken(oldToken) {
  try {
    const decodedToken = verifyToken(oldToken)
    const user = User.findById(decodedToken.id)
    if (!user) {
      throw new error("user not found")
    }
    const newToken = generateTokens(user)
    return newToken
  } catch (error) {
    throw new error("Invalid token new")
  }

}




// Password Reset Controller
async function resetPassword(req, res) {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}




module.exports = {
  login, refreshToken, resetPassword
}