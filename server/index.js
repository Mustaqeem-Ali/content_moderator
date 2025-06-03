import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { analyzeText } from "./geminiService.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.post("/analyze", async (req, res) => {
  try {
    const { text } = req.body;
    const result = await analyzeText(text);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error analyzing text" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
