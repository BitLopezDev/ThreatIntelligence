import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import FormData from "form-data";
import fetch from "node-fetch";
import { SendFileOptions } from "express-serve-static-core";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

  let data: any = await response.json();
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

app.post("/api/virustotal/files", upload.array("files"), async (req, res) => {
  /* try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const apiKey = process.env.APIKEYVT;
    if (!apiKey) {
      return res.status(500).json({ error: "VirusTotal API key not provided" });
    }

    const formData = new FormData();
    (req.files as Express.Multer.File[]).forEach((file) => {
      formData.append("file", file.buffer, { filename: file.originalname });
    });

    const vtResponse = await fetch("https://www.virustotal.com/api/v3/files", {
      method: "POST",
      headers: {
        "x-apikey": apiKey,
      },
      body: formData,
    });

    const vtData = await vtResponse.json();
    res.json(vtData);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }*/
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
