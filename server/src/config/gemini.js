import 'dotenv/config';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
    
    apiKey: process.env.GEMINI_API_KEY, 
});

export const GEMINI_MODEL = process.env.GEMINI_MODEL;
console.log("Gemini Key Loaded:", !!process.env.GEMINI_API_KEY);

export default ai;