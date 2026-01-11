
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";

// Corrected initialization to strictly follow SDK guidelines using the named parameter and direct environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const extractProfessionalSkills = async (story: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Analyze this narrative for professional competencies and provide reasoning: "${story}"`,
    config: {
      systemInstruction: SYSTEM_PROMPT,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          Professional_Title: { type: Type.STRING },
          Hard_Skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          Soft_Skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          Impact_Statement: { type: Type.STRING },
          AI_Reasoning: { 
            type: Type.STRING, 
            description: "A transparent explanation of how the AI mapped the lived experience to these specific professional skills." 
          }
        },
        required: ["Professional_Title", "Hard_Skills", "Soft_Skills", "Impact_Statement", "AI_Reasoning"]
      }
    }
  });

  return JSON.parse(response.text || "{}");
};

/**
 * Agentic Career Coach: Generates a clarifying follow-up question to deepen the skill profile.
 */
export const getAgenticFollowUp = async (story: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this experience: "${story}", ask ONE empathetic follow-up question that helps uncover more specific professional skills (like budget size, team size, or specific tools used).`,
    config: {
      systemInstruction: "You are an empathetic Career Coach for marginalized workers. Your goal is to help them realize the value of their labor. Be brief, supportive, and specific."
    }
  });

  return response.text || "Could you tell me more about the impact of this work on your community?";
};

export const anonymizeProfile = async (profileText: string): Promise<string> => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Anonymize the following profile text. 
    1. Remove all proper names (replace with [Candidate]). 
    2. Remove or neutralize gender-specific pronouns. 
    3. Remove specific ages or graduation years. 
    4. Remove specific city/state locations. 
    
    PROFILE TEXT: "${profileText}"`,
    config: {
      systemInstruction: "You are an expert Bias-Mitigation Editor. Strip identifying demographic data while preserving 100% of the competency information."
    }
  });

  return response.text || "Error processing anonymization.";
};
