import { Router } from "express";

import { register, login, getCurrentUser,} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

import { registerValidation, loginValidation,} from "../validators/auth.validators.js"

const router = Router();

router.post("/register",registerValidation,validateRequest, register);

router.post("/login", loginValidation,validateRequest, login);

router.get("/me", authMiddleware, getCurrentUser);

export default router;