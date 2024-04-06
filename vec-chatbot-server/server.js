const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const responses = JSON.parse(fs.readFileSync("responses.json", "utf-8"));

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;
    const witResponse = await getWitAiResponse(userMessage);
    const botResponse = handleWitAiResponse(witResponse);

    res.json({ botResponse });
  } catch (error) {
    console.error("Error handling chat request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function getWitAiResponse(userInput) {
  const witApiKey = "AB7QFP5R3AYSWHZROJ3PJSL5D6UTJULP";
  const q = encodeURIComponent(userInput);
  const witApiUrl = "https://api.wit.ai/message?v=20230215&q=" + q;

  const response = await axios.get(witApiUrl, {
    headers: {
      Authorization: `Bearer ${witApiKey}`,
    },
  });
  console.log(response.data);
  return response.data;
}
function handleWitAiResponse(witResponse) {
  const intent = witResponse.intents[0]?.name;
  const response = responses[intent];

  if (response) {
    return response;
  } else {
    return "I'm sorry, I didn't understand that. Please try again.";
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
