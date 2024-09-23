const express = require("express");
const { resetPassword } = require("../controllers/auth");
const cors = require("cors");

const router = express.Router();

router.use(cors());

// Define the password reset route
router.post("/reset-password", resetPassword);

module.exports = router;
