import * as interviewService from "../services/interview.service.js";
import { successResponse } from "../utils/ApiResponse.js";


export const generateInterview = async (req, res, next) => {
    try {

        const data = await interviewService.generateInterview(
            req.user._id,
            req.body
        );

        return successResponse(
            res,
            201,
            "Interview generated successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const getInterviewById = async (req, res, next) => {
    try {

        const data = await interviewService.getInterviewById(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Interview fetched successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const getCurrentQuestion = async (req, res, next) => {
    try {

        const data = await interviewService.getCurrentQuestion(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Current question fetched successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const submitAnswer = async (req, res, next) => {
    try {
        console.log(req.body);
        const data = await interviewService.submitAnswer(
            req.user._id,
            req.params.id,
            req.body.answer,
            req.body.timeTaken
        );

        return successResponse(
            res,
            200,
            "Answer submitted successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const getInterviewReport = async (req, res, next) => {
    try {

        const data = await interviewService.getInterviewReport(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Interview report fetched successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};
export const deleteInterview = async (req, res, next) => {
    try {

        const result = await interviewService.deleteInterview(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Interview deleted successfully",
            result
        );

    } catch (error) {
        next(error);
    }
};
export const getAllInterviews = async (req, res, next) => {
    try {

        const interviews = await interviewService.getAllInterviews(
            req.user._id
        );

        return successResponse(
            res,
            200,
            "Interviews fetched successfully",
            interviews
        );

    } catch (error) {
        next(error);
    }
};