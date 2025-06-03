import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeText(inputText) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are a content moderation assistant. Analyze the following user text for:
- Inappropriate language
- Hate speech
- Sexual harassment

If it's inappropriate, return a JSON object like this:
{
  "isInappropriate": true,
  "warning": "explanation in minimal words and in the language which they have provided",
  "suggestion": "polite and respectful version, minimal answer and in the language which they have provided"
}

If it's appropriate, return:
{
  "isInappropriate": false
}

Text: """${inputText}"""
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return JSON.parse(jsonMatch[0]);

  throw new Error("Invalid JSON from Gemini response");
}
