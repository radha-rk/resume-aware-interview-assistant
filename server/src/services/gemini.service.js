import ai, { GEMINI_MODEL } from "../config/gemini.js";
import ApiError from "../utils/ApiError.js";
import { resumeParserPrompt, interviewPrompt, answerEvaluationPrompt, finalReportPrompt} from "../ai/prompts.js";
import { cleanJsonResponse } from "../utils/cleanJson.js";

export const parseResume = async (resumeText) => {
    try {

        const prompt = resumeParserPrompt(resumeText);

        console.log("===== Resume Text =====");
        console.log(resumeText.slice(0, 1000));

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL ,
            contents: prompt,
        });
        
        console.log("===== FULL RESPONSE =====");
        console.dir(response, { depth: null });

        const cleanedText = cleanJsonResponse(response.text);

        console.log("===== Gemini Response =====");
        console.log(cleanedText);

        return JSON.parse(cleanedText);

    } catch (error) {
    console.error("Gemini Parse Error:", error);

    if (error instanceof ApiError) {
        throw error;
    }

    throw new ApiError(500, "Failed to parse resume");
   }
};

export const generateInterviewQuestions = async (
    parsedResume,
    role,
    difficulty
) => {
    try {

        const prompt = interviewPrompt(
            parsedResume,
            role,
            difficulty
        );
        console.log("Model:", GEMINI_MODEL);
        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        const cleanedText = cleanJsonResponse(response.text);

        const questions = JSON.parse(cleanedText);

        if (!Array.isArray(questions)) {
            throw new ApiError(500,  "Invalid AI response" );
        }

        if (questions.length !== 12) {
            throw new ApiError(500, "Gemini returned incorrect number of questions"  );
        }

        return questions;

    } catch (error) {

    console.error("===== GEMINI ERROR =====");
    console.error(error);
    console.error("========================");

    if (error instanceof ApiError) {
        throw error;
    }

    throw new ApiError(
        500,
        error.message || "Failed to generate interview questions"
    );
}
};

export const evaluateAnswer = async (
    question,
    expectedTopics,
    answer
) => {
    try {

        const prompt = answerEvaluationPrompt(
            question,
            expectedTopics,
            answer
        );

        const response = await ai.models.generateContent({
            model: GEMINI_MODEL,
            contents: prompt,
        });

        const cleanedText = cleanJsonResponse(response.text);

        const evaluation = JSON.parse(cleanedText);

        if (
            typeof evaluation.score !== "number" ||
            !("feedback" in evaluation) ||
            !("idealAnswer" in evaluation) ||
            !Array.isArray(evaluation.strengths) ||
            !Array.isArray(evaluation.improvements)
        ) {
            throw new ApiError(
                500,
                "Invalid evaluation response from Gemini"
            );
        }

        return evaluation;

    } catch (error) {

        if (error instanceof ApiError) {
            throw error;
        }

        throw new ApiError(
            500,
            "Failed to evaluate answer"
        );
    }
};

export const generateFinalReport = async (questions) => {

    try {

        const prompt = finalReportPrompt(
            questions
        );

        const response =
            await ai.models.generateContent({

                model: GEMINI_MODEL,

                contents: prompt,

            });

        const cleaned =
            cleanJsonResponse(response.text);

        return JSON.parse(cleaned);

    } catch (error) {

        throw new ApiError(
            500,
            "Failed to generate report"
        );

    }

};