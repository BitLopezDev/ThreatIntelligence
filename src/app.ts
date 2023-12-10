import express, { Request, Response } from "express";
import path from "path";
import { SendFileOptions } from "express-serve-static-core";
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "../public")));

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
  console.log(`Server listening at http://localhost:${port}`);
});
