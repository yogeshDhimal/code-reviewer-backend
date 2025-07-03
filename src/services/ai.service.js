import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

const aiService = async (code) => {
  try {
    const result = await genAI.models.generateContent({
      model: "gemini-2.5-flash",
      systemInstruction : `
        You are a professional code reviewer.

        Your job is to:
        - Detect any syntax errors, bugs, or potential issues in the provided code.
        - Suggest improvements or refactoring for readability, maintainability, and performance.
        - Always explain your suggestions in a helpful and concise way.
        - Even if there are no bugs, provide best practices and suggestions.

      Only review the code. Be technical, precise, and constructive.
      `,
      contents: [
        {
          role: "user",
          parts: [{ text: code }],
        },
      ],
    });

    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    return text || "No response generated.";
  } catch (err) {
    console.error("AI Service Error:", err.message);
    return "Error generating AI response.";
  }
};

export default aiService;
