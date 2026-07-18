import { Router } from "express";
import  authMiddleware from "../middleware/authMiddleware.js";
import { getCurrentQuestion,submitAnswer,getInterviewReport} from "../controllers/interview.controller.js";

const router = Router();

router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Resume-Aware Technical Interview Assistant API",
    });
});

router.get( "/:id/current",authMiddleware, getCurrentQuestion);

router.post("/:id/answer",authMiddleware,submitAnswer);

router.get("/:id/report",authMiddleware,getInterviewReport);

export default router;