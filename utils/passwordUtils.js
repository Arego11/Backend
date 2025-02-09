const bcrypt = require("bcryptjs");

async function generateSalt(rounds = 10) {
    return await bcrypt.genSalt(rounds);
}

async function hashPassword(password, salt) {
    return await bcrypt.hash(password, salt);
}

module.exports = {
    generateSalt,
    hashPassword,
};