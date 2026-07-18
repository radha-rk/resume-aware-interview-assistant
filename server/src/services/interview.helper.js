import Interview from "../models/Interview.js";
import ApiError from "../utils/ApiError.js";

export const getValidatedInterview = async ( userId,interviewId) => {

    const interview = await Interview.findById(interviewId);

    if (!interview) {
        throw new ApiError(404, "Interview not found");
    }

    if (interview.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    return interview;
};

export const calculateCategoryScore = (questions, type) => {

    const filtered =
        questions.filter(
            q => q.type === type
        );

    if (!filtered.length) return 0;

    const total =
        filtered.reduce(
            (sum, q) => sum + q.score,
            0
        );

    return Number(
        (total / filtered.length)
        .toFixed(2)
    );

};

export const formatQuestion = (question, index) => ({
    questionNumber: index + 1,
    question: question.question,
    type: question.type,
    difficulty: question.difficulty,
});
