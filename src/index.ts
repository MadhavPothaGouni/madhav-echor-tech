import express, { Request, Response } from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

interface TransformResult {
  word_count: number;
  unique_words: string[];
  reversed_sentence: string;
}

function transformSentence(sentence: string): TransformResult {
  const words = sentence.trim().split(/\s+/);

  const word_count = words.length;

  const uniqueSet = new Set(words.map(w => w.toLowerCase()));
  const unique_words = Array.from(uniqueSet);

  const reversed_sentence = [...words].reverse().join(" ");

  return { word_count, unique_words, reversed_sentence };
}

app.post("/api/transform", (req: Request, res: Response) => {
  const { sentence } = req.body;

  if (!sentence || typeof sentence !== "string") {
    return res.status(400).json({ error: "sentence is required and must be a string" });
  }

  const result = transformSentence(sentence);
  return res.json(result);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
