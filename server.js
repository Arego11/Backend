require('dotenv').config();
console.log("MONGO_URI:", process.env.MONGO_URI);

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {})
    .then(() => {
      const authRoutes = require("./api/routes/auth");

      app.use("/api/auth", authRoutes);

      app.post('/api/chat', async (req, res) => {
        const userMessage = req.body.message;

        try {
          const response = await axios.post(
              'https://api.llama.ai/v1/engines/llama-2/completions', {
                prompt : userMessage,
                max_tokens : 150,
              },
              {
                headers : {
                  'Authorization' : `Bearer ${
                      process.env.LLAMA_API_KEY}`, 
                  'Content-Type' : 'application/json',
                },
              });

          const botResponse = response.data.choices[0].text.trim();
          res.json({response : botResponse});
        } catch (error) {
          console.error('Error communicating with AI:', error);
          res.status(500).json({response : 'Error communicating with AI.'});
        }
      });

      app.get("/", (req, res) => { res.send("Server is running!"); });

      const PORT = process.env.PORT || 8080;
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

      console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.log("Error connecting to MongoDB:", err);
      process.exit(1);
    });