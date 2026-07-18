import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import indexRoutes from "./routes/index.routes.js";
import errorHandler from "./middleware/errorHandler.js";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";


const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(compression());

// Routes
app.use("/api/auth", authRoutes);
app.use("/", indexRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found",
    });
});

// Global Error Handler
app.use(errorHandler);



export default app;
