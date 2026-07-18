import fs from "fs";
import imagekit from "../config/imagekit.js";
import ApiError from "../utils/ApiError.js";  

export const uploadFile = async (file) => {
  try {
    const fileBuffer = fs.readFileSync(file.path);

    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: file.filename,
      folder: "/resumes",
    });

    return response;
  } catch (error) {
    throw new ApiError(500, "ImageKit upload failed");
  }
};

export const deleteFile = async (fileId) => {
  try {
     await imagekit.deleteFile(fileId);
     return true;
  } catch (error) {
    throw new ApiError(500, "Failed to delete file");
  }
};

export const deleteResume = async (
    userId,
    resumeId
) => {

    const resume = await getValidatedResume(
        userId,
        resumeId
    );

    await deleteFile(resume.imagekitFileId);

    await resume.deleteOne();

    return null;

};
