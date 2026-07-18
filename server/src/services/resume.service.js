import fs from "fs/promises";

import Resume from "../models/Resume.js";
import ApiError from "../utils/ApiError.js";

import { uploadFile, deleteFile } from "./imagekit.service.js";
import { extractTextFromPDF } from "./parser.service.js";
import { parseResume } from "./gemini.service.js";
import { getValidatedResume } from "./resume.helper.js";

export const uploadResume = async (user, file) => {

    if (!file) {
        throw new ApiError(400, "Resume file is required");
    }

    const uploadedFile = await uploadFile(file);

    const resumeText = await extractTextFromPDF(file.path);

    const parsedResume = await parseResume(resumeText);

    const resume = await Resume.create({
        user: user._id,
        fileName: file.originalname,
        fileUrl: uploadedFile.url,
        imageKitFileId: uploadedFile.fileId,
        parsedData: parsedResume,
    });

    await fs.unlink(file.path);

    return resume;

};

export const getAllResumes = async (userId) => {

    return await Resume.find({ user: userId })
        .select("-parsedData")
        .sort({ createdAt: -1 });

};
export const getMyResume = async (userId) => {

    const resume = await Resume.findOne({ user: userId });

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    return resume;
};

export const getResumeById = async (
    userId,
    resumeId
) => {

    return await getValidatedResume(
        userId,
        resumeId
    );

};

export const deleteResume = async (  userId, resumeId) => {

    const resume = await getValidatedResume(
        userId,
        resumeId
    );

 // Delete file from ImageKit
    if (resume.imageKitFileId) {
        await deleteFile(resume.imageKitFileId);
    }

    // Delete document from MongoDB
    await resume.deleteOne();

    return {
        deleted: true,
        resumeId,
    };

};