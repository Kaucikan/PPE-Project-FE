
import { GoogleGenAI, Type } from "@google/genai";
import { DetectionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function detectPPEViolations(base64Image: string): Promise<DetectionResult> {
  // Use gemini-3-flash-preview for general vision tasks and analysis
  const model = 'gemini-3-flash-preview';
  
  const systemInstruction = `
    You are a professional industrial safety inspector. 
    Analyze the provided image for PPE (Personal Protective Equipment) compliance.
    Required PPE items: Hard Hat, Safety Vest, Safety Glasses, Gloves.
    If any person is missing these items in a construction or industrial setting, it's a violation.
    Return the analysis in a strictly structured JSON format.
  `;

  const prompt = `Analyze this image for PPE violations. Return JSON following this schema:
    {
      "isSafe": boolean,
      "violations": [
        {
          "type": string (e.g., "Missing Hard Hat"),
          "description": string,
          "severity": "Low" | "Medium" | "High"
        }
      ],
      "confidence": number (0 to 1)
    }`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [
          { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
          { text: prompt }
        ]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isSafe: { type: Type.BOOLEAN },
            violations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING }
                },
                required: ['type', 'description', 'severity']
              }
            },
            confidence: { type: Type.NUMBER }
          },
          required: ['isSafe', 'violations', 'confidence']
        }
      }
    });

    // Access the text property directly from GenerateContentResponse
    const result = JSON.parse(response.text || '{}');
    return result as DetectionResult;
  } catch (error) {
    console.error("PPE Detection Error:", error);
    throw error;
  }
}
