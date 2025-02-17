const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function findUserByEmail(email) {
  console.log('----')
  const user = await User.findOne({email});
  console.log(user)
  return user
}

function generateToken(userId) {
  return jwt.sign({id : userId}, process.env.JWT_SECRET, {expiresIn : "1h"});
}

module.exports = {
  findUserByEmail,
  generateToken,
};