const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

async function comparePasswords(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

function generateToken(userId) {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
}

module.exports = {
    findUserByEmail,
    comparePasswords,
    generateToken,
};