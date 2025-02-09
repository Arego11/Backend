const express = require("express");
const { findUserByEmail, comparePasswords, generateToken } = require("../utils/authUtils");
const { generateSalt, hashPassword } = require("../utils/passwordUtils");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        let user = await findUserByEmail(email);
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = generateToken(user._id);

        res.json({ message: "User registered!", token });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user._id);

        res.json({ message: "Login successful", token });
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;