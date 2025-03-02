import express from "express";
import fetch from "node-fetch";

const router = express.Router();

router.post("/", async (req, res) => {
  const userMessage = req.body.message;

  const response = await fetch(
      "https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf",
      {
        method : "POST",
        headers : {
          Authorization : `Bearer ${process.env.HF_TOKEN}`,
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({inputs : userMessage}),
      });

  const data = await response.json();
  res.json(
      {response : data[0]?.generated_text || "Error generating response."});
});

export default router;