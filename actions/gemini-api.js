"use server";

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function analyzeScores({ scores, answers }) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      The user completed PHQ-9 and GAD-7 assessments.

      PHQ-9 Score: ${scores.phq9}
      GAD-7 Score: ${scores.gad7}

      Here are their answers:
      ${answers.map((a, i) => `Q${i + 1}: ${a.question} → ${a.answer}`).join("\n")}

      Please analyze:
      - Their current stress and anxiety levels
      - What this score and answers generally indicate
      - A short recommendation (wellness advice, next steps)

      Respond strictly in valid JSON format with these exact keys:
      {
        "summary": "...",
        "stressLevel": "...",
        "recommendation": "..."
      }
      Do not include any explanation or markdown formatting.
    `;

    const result = await model.generateContent(prompt);

    // ✅ Safely extract text
    const text =
      result.response?.text?.() ||
      result.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "";

    // ✅ Clean possible code blocks
    let cleaned = text.trim();
    if (cleaned.startsWith("```")) {
      cleaned = cleaned.replace(/^```(json)?/, "").replace(/```$/, "").trim();
    }

    // ✅ Try parsing JSON
    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      parsed = {
        summary: cleaned || "No structured summary provided.",
        stressLevel: "Unknown",
        recommendation: "Could not parse structured result.",
      };
    }

    return parsed;
  } catch (error) {
    console.error("Gemini error:", error);
    return {
      summary: "Could not analyze results.",
      stressLevel: "Unknown",
      recommendation: "Please try again later.",
    };
  }
}
