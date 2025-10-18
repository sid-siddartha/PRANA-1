import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req) {
  try {
    const { scores, answers } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const prompt = `
      The user completed PHQ-9 and GAD-7 assessments.

      PHQ-9 Score: ${scores.phq9}
      GAD-7 Score: ${scores.gad7}

      Here are their answers:
      ${answers.map((a, i) => `Q${i + 1}: ${a.question} → ${a.answer}`).join("\n")}

      Please respond ONLY in JSON with keys:
      {
        "summary": "...",
        "stressLevel": "...",
        "recommendation": "..."
      }
    `;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: "application/json" },
    });

    const text = result.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return Response.json(
      {
        summary: "Could not analyze results.",
        stressLevel: "Unknown",
        recommendation: "Please try again later.",
      },
      { status: 500 }
    );
  }
}
