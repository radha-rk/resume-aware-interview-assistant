import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { uploadResume, getMyResume,getAllResumes,getResumeById,deleteResume} from "../controllers/resume.controller.js";


const router = Router();

router.post( "/upload", authMiddleware, upload.single("resume"), uploadResume);

router.get( "/my", authMiddleware, getMyResume );

router.get( "/", authMiddleware, getAllResumes);

router.get( "/:id", authMiddleware, getResumeById);

router.delete( "/:id", authMiddleware, deleteResume);

export default router;