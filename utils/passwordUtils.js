const bcrypt = require("bcryptjs");

async function generateSalt() {
    return await bcrypt.genSalt(10);
}

async function hashPassword(password, salt) {
    return await bcrypt.hash(password, salt);
}

async function comparePasswords(inputPassword, storedPassword) {
    return await bcrypt.compare(inputPassword, storedPassword);
}

module.exports = {
    generateSalt,
    hashPassword,
    comparePasswords,
};