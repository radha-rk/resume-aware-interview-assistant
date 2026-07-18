import Interview from "../models/Interview.js";
import Resume from "../models/Resume.js";

import ApiError from "../utils/ApiError.js";

import { generateInterviewQuestions,evaluateAnswer,generateFinalReport, } from "./gemini.service.js";

import { getValidatedInterview, calculateCategoryScore, formatQuestion, } from "./interview.helper.js";
import { getValidatedResume } from "./resume.helper.js";

export const generateInterview = async ( userId, interviewData ) => {

    const {resumeId, role, difficulty, } = interviewData;

    if (!resumeId || !role || !difficulty) {
        throw new ApiError(400, "Resume, role and difficulty are required");
    }

    const resume = await getValidatedResume(userId,resumeId);
    
    const questions =
        await generateInterviewQuestions(
            resume.parsedData,
            role,
            difficulty
        );

    const interview = await Interview.create({
        user: userId,
        resume: resume._id,
        role,
        difficulty,
        questions,
    });

    return interview;
};

export const getInterviewById = async (userId,interviewId ) => {

   const interview = await getValidatedInterview(userId,interviewId   );

    return interview;
};

export const getCurrentQuestion = async (userId, interviewId ) => {

    const interview = await getValidatedInterview(userId, interviewId);

    if (interview.status === "Completed") {
        throw new ApiError( 400,"Interview already completed" );}

    const currentIndex = interview.currentQuestion;

    if (currentIndex >= interview.questions.length) {
        throw new ApiError( 400, "No questions remaining" ); }

     return {
        currentQuestion: currentIndex + 1,
        totalQuestions: interview.questions.length,
        question: formatQuestion(interview.questions[currentIndex], currentIndex ),       
    };
};

export const submitAnswer = async (
    userId,
    interviewId,
    answer,
    timeTaken
) => {

    if (!answer) {
        throw new ApiError(400, "Answer is required");
    }

    // Validate interview & ownership
    const interview = await getValidatedInterview(
        userId,
        interviewId
    );

    // Already completed?
    if (interview.status === "Completed") {
        throw new ApiError(400, "Interview already completed");
    }

    // Current question index (0-based)
    const currentIndex = interview.currentQuestion;

    if (currentIndex >= interview.questions.length) {
        throw new ApiError(400, "No more questions remaining");
    }

    const currentQuestion = interview.questions[currentIndex];

    // Evaluate using Gemini
    const evaluation = await evaluateAnswer(
        currentQuestion.question,
        currentQuestion.expectedTopics,
        answer
    );

    // Save evaluation
    currentQuestion.answer = answer;
    currentQuestion.score = evaluation.score;
    currentQuestion.feedback = evaluation.feedback;
    currentQuestion.idealAnswer = evaluation.idealAnswer;
    currentQuestion.strengths = evaluation.strengths;
    currentQuestion.improvements = evaluation.improvements;
    currentQuestion.timeTaken = timeTaken || 0;

    // Move to next question
    interview.currentQuestion++;

    const isCompleted =
        interview.currentQuestion >= interview.questions.length;

    interview.status = isCompleted
        ? "Completed"
        : "In Progress";

    await interview.save();

    // Generate report after interview completion
    if (isCompleted) {

        await generateInterviewReport(interview);

        return {
            completed: true,
            report: interview.report,
        };
    }

    // Return next question
    return {
        completed: false,
        currentQuestion: interview.currentQuestion + 1, // Human-readable
        totalQuestions: interview.questions.length,
        nextQuestion: formatQuestion(
            interview.questions[interview.currentQuestion]
        ), 
    };
};

export const getInterviewReport = async (userId,interviewId)=>{
 const interview =
    await getValidatedInterview(
        userId,
        interviewId
    );

     if(interview.status!=="Completed"){   
         throw new ApiError(400, "Interview not completed" );
    }

    return interview.report;

}

export const deleteInterview = async (
    userId,
    interviewId
) => {

    const interview = await getValidatedInterview(
        userId,
        interviewId
    );

    await interview.deleteOne();

    return {
        deleted: true,
        interviewId,
    };
};

const generateInterviewReport = async (interview) => {

    const technicalScore = calculateCategoryScore( interview.questions, "Technical");
    
    const projectScore = calculateCategoryScore( interview.questions, "Project" );

    const coreCSScore = calculateCategoryScore( interview.questions, "Core CS" );

    const behavioralScore = calculateCategoryScore( interview.questions, "Behavioral" );

    const totalScore = interview.questions
                .reduce((sum, question) => sum + question.score, 0 );

    const overallScore = Number (
    (totalScore / interview.questions.length).toFixed(2) );
    
    const aiReport = await generateFinalReport( interview.questions);

     interview.report = {
        overallScore,
        technicalScore,
        projectScore,
        coreCSScore,
        behavioralScore,

        strengths: aiReport.strengths || [],

        weakTopics: aiReport.weakTopics || [],

        roadmap: aiReport.roadmap || [],
    };

    await interview.save();

    return interview.report;
};
export const getAllInterviews = async (userId) => {

    const interviews = await Interview.find({
        user: userId,
    })
        .select("-questions")
        .sort({ createdAt: -1 });

    return interviews;
};