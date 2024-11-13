const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const app = express();
require('dotenv').config();
const cors = require("cors");


app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {

  const googleAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 100,
  };

  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
  });

  try {
    // const { prompt } = req.body;
    // console.log(prompt);
    req.body = JSON.stringify(req.body)

    
    const result = await geminiModel.generateContent(req.body,"give line by line points, add name like title , no in paragraph");
    const response = result.response;
    res.status(201).json({
      success: true,
      response: response.text(),
    });
  } catch (error) {
    console.log("response error", error);
    res.status(500).json({
      success: true,
      // error: error.message,
    });
  }

 
});

module.exports = app;

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server listening on port`);
});

