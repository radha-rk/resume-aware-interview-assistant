import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import { generateInterview, getInterviewById,getCurrentQuestion, submitAnswer, getInterviewReport, deleteInterview,getAllInterviews } from "../controllers/interview.controller.js";
//getallinterview
const router = Router();

router.post( "/generate", authMiddleware, generateInterview);
router.get("/", authMiddleware, getAllInterviews);
router.get("/:id/current", authMiddleware, getCurrentQuestion);
router.post("/:id/answer", authMiddleware, submitAnswer);
router.get("/:id/report", authMiddleware, getInterviewReport);
router.delete("/:id", authMiddleware, deleteInterview);
router.get("/:id", authMiddleware, getInterviewById);
    
export default router;