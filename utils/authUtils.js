const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = {
    findUserByEmail,
    generateToken,
};