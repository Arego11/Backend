const express = require("express");
const { findUserByEmail, generateToken } = require("../../utils/authUtils");
const { generateSalt, hashPassword, comparePasswords } = require("../../utils/passwordUtils");
const User = require("../../models/User"); // Ensure User model is imported

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        console.log("Signup request received:", { username, email, password });

        let user = await findUserByEmail(email);
        if (user) return res.status(400).json({ message: "User already exists" });

        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        user = new User({ username, email, password: hashedPassword });
        await user.save();

        const token = generateToken(user._id);

        res.json({ message: "User registered!", token });
    } catch (err) {
        console.error("Error during signup:", err); // Log the error
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log("Login request received:", { email, password });

        let user = await findUserByEmail(email);
        if (!user) return res.status(400).json({ message: "Invalid email credentials" });

        const isMatch = await comparePasswords(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid password credentials" });

        const token = generateToken(user._id);

        res.json({ message: "Login successful", token });
    } catch (err) {
        console.error("Error during login:", err); // Log the error
        res.status(500).json({ message: "Server Error", error: err.message });
    }
});

module.exports = router;