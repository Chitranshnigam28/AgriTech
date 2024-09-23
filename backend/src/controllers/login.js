const authService = require("../services/login")

async function login(req, res) {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const token = await authService.login(email, password)
        res.json({ token: token })
    } catch (error) {
        res.status(401).json({ message: "Invalid Credentials err" })
    }
}

async function refreshToken(req, res) {
    try {
        const { token} = req.body
        const newToken = await authService.refreshToken(token)
        res.json({ newToken: newToken })
    } catch (error) {
        res.status(401).json({ message: "Invalid token new (login controller)" })
    }
}

module.exports = {
  login,refreshToken
}
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");

// // Load token secrets from environment variables (or use hardcoded as fallback)
// const tokenSecret = process.env.ACCESS_TOKEN_SECRET || 'yourSecretKey';
// const refreshSecret = process.env.REFRESH_TOKEN_SECRET || 'yourRefreshSecretKey';

// // Login function
// async function login(req, res) {
//   const { email, password } = req.body;

//   try {
//     // Find the user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid Credentials' });
//     }

//     // Compare the password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Invalid Credentials' });
//     }

//     // Generate a token
//     const token = jwt.sign({ id: user._id, role: user.role }, tokenSecret, { expiresIn: '1h' });

//     // Generate a refresh token (valid for 7 days)
//     const refreshToken = jwt.sign({ id: user._id, role: user.role }, refreshSecret, { expiresIn: '7d' });

//     // Return the tokens
//     res.json({ token, refreshToken });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// }

// // Refresh Token function
// async function refreshToken(req, res) {
//   const { refreshToken } = req.body;

//   if (!refreshToken) {
//     return res.status(401).json({ message: 'No refresh token provided' });
//   }

//   try {
//     // Verify the refresh token
//     const decoded = jwt.verify(refreshToken, refreshSecret);

//     // Generate a new access token
//     const newAccessToken = jwt.sign({ id: decoded.id, role: decoded.role }, tokenSecret, { expiresIn: '1h' });

//     // Log message for successful refresh
//     console.log(`New access token issued for user ID: ${decoded.id}`);

//     // Send the new access token to the client
//     res.json({ accessToken: newAccessToken });
//   } catch (error) {
//     console.error('Error refreshing token:', error);
//     return res.status(403).json({ message: 'Invalid refresh token' });
//   }
// }

// module.exports = {
//   login,
//   refreshToken
// };
