import Resume from "../models/Resume.js";
import ApiError from "../utils/ApiError.js";

export const getValidatedResume = async (userId, resumeId) => {

    const resume = await Resume.findById(resumeId);

    if (!resume) {
        throw new ApiError(404, "Resume not found");
    }

    if (resume.user.toString() !== userId.toString()) {
        throw new ApiError(403, "Unauthorized");
    }

    return resume;
};