const User = require("../models/User");

async function findUserByEmail(email) {
    return await User.findOne({ email });
}

module.exports = {
    findUserByEmail,
};