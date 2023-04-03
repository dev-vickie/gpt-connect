const express = require("express");
const dotenv = require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const configuration = new Configuration({ apiKey: process.env.OPEN_AI_KEY });

const openai = new OpenAIApi(configuration);

app.post("/find-complexity", async (req, res) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `The largest mountain in the world is`,
      max_tokens: 64,
      temperature: 0,
      presence_penalty: 0.0,
      stop: ["/n"],
    });
    return res.status(200).json({
      success: true,
      data: response.data.choices[0].text,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data 
      : "Some error occured",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server runing on port ${PORT}`);
});
