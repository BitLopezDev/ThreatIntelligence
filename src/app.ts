import express, { Request, Response } from "express";
import path from "path";
import { SendFileOptions } from "express-serve-static-core";
require("dotenv").config();
const app = express();

const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

app.get("/gpt", async (req: Request, res: Response) => {
  //res.json(callGPT());
});

app.get("/vt", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public", "virustotal.html"));
});
app.get("/api/virustotal/url", async (req, res) => {
  const urlToScan = req.query.url;
  let headersList = {
    Accept: "*/*",
    "User-Agent": "BitLopez Dev Threat Intelligence App",
    "x-apikey": `${process.env.APIKEYVT!}`,
  };

  let response = await fetch(
    `https://www.virustotal.com/api/v3/urls?url=${urlToScan}`,
    {
      method: "POST",
      headers: headersList,
    }
  );

  let data = await response.json();
  const analysisId = data.data.id;

  // Espera un poco antes de solicitar el resultado del análisis
  await new Promise((resolve) => setTimeout(resolve, 15000));

  let analysisResponse = await fetch(
    `https://www.virustotal.com/api/v3/analyses/${analysisId}`,
    {
      headers: headersList,
    }
  );

  let analysisData = await analysisResponse.json();
  res.send(analysisData);
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
