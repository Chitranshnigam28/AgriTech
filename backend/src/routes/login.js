const express = require("express");
const cors = require("cors");
const { login ,refreshToken } = require("../controllers/login");

const router = express.Router();

router.use(cors());

// Login route
router.post("/login", login);
router.post("/refresh-token", refreshToken);
// Refresh Token route
// router.post("/refresh-token", refreshToken); // Add a new route for refreshing the token

module.exports = router;
