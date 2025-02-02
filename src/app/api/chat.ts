import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end(); // Only allow POST requests

  try {
    const { messages } = req.body; // Chat history from frontend
    const apiKey = process.env.OPENAI_API_KEY; // API key from .env.local

    // Call OpenAI's API (You can change it to Gemini, Sonnet, etc.)
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4-turbo", // Change this if using another model
        messages,
        temperature: 0.7,
      },
      {
        headers: { Authorization: `Bearer ${apiKey}` },
      }
    );

    res.json({ reply: response.data.choices[0].message.content }); // Send AI's reply to frontend
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Error fetching AI response" });
  }
}
