import * as resumeService from "../services/resume.service.js";
import { successResponse } from "../utils/ApiResponse.js";

export const uploadResume = async (req, res, next) => {
    try {

        const data = await resumeService.uploadResume(
            req.user,
            req.file
        );

        return successResponse(
            res,
            201,
            "Resume uploaded successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const getMyResume = async (req, res, next) => {
    try {

        const data = await resumeService.getMyResume(req.user._id);

        return successResponse(
            res,
            200,
            "Resume fetched successfully",
            data
        );

    } catch (error) {
        next(error);
    }
};

export const getAllResumes = async (req, res, next) => {
    try {

        const resumes = await resumeService.getAllResumes(req.user._id);

        return successResponse(
            res,
            200,
            "Resumes fetched successfully",
            resumes
        );

    } catch (error) {
        next(error);
    }
};

export const getResumeById = async (req, res, next) => {

    try {

        const resume = await resumeService.getResumeById(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Resume fetched successfully",
            resume
        );

    } catch (error) {

        next(error);

    }

};

export const deleteResume = async (req, res, next) => {
    try {

        const result = await resumeService.deleteResume(
            req.user._id,
            req.params.id
        );

        return successResponse(
            res,
            200,
            "Resume deleted successfully",
            result
        );

    } catch (error) {
        next(error);
    }
};