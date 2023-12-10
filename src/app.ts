import express, { Request, Response } from "express";
import path from "path";
import { SendFileOptions } from "express-serve-static-core";
require("dotenv").config();
const app = express();
const OpenAI = require("openai");
const port = 3000;
const ai = new OpenAI({
  apiKey: process.env.APIKEY,
});

app.use(express.static(path.join(__dirname, "../public")));

app.get("/gpt", async (req: Request, res: Response) => {
  const response = await ai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: "Tell me a fun fact",
      },
    ],
    max_tokens: 100,
  });
  const fact = JSON.stringify(response.choices[0].message.content);
  res.json({ fact });
});

app.get("/", (req: Request, res: Response) => {
  // Send the HTML file
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/data", (req: Request, res: Response) => {
  // Send additional JSON data
  const message = "Hello World!";
  res.json({ message });
});

app.listen(port, () => {
  // console.log(`Server listening at http://localhost:${port}`);
});
