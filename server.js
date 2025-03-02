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
          console.log('Sending request to LLaMA API with message:',
                      userMessage); // Log the message being sent
          const response = await axios.post(
              'https://api.llama-api.com/v1/chat/completions', {
                messages : [
                  {role : "system", content : "You are a helpful assistant."},
                  {role : "user", content : userMessage}
                ],
                model : "llama-2",
                stream : false
              },
              {
                headers : {
                  'Authorization' : `Bearer ${process.env.LLAMA_API_KEY}`,
                  'Content-Type' : 'application/json',
                },
              });

          if (response.data && response.data.choices &&
              response.data.choices.length > 0) {
            const botResponse = response.data.choices[0].message.content.trim();
            console.log('Received response from LLaMA API:',botResponse); // Log the response from the API
            res.json({response : botResponse});
          } else {
            console.error('Invalid response structure:', response.data);
            res.status(500).json(
                {response : 'Invalid response structure from AI.'});
          }
        } catch (error) {
          console.error('Error communicating with AI:',error.response ? error.response.data : error.message);
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