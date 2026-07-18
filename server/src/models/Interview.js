import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
    {
        question: {
            type: String,
            required: true,
            trim: true,
        },

        type: {
            type: String,
            enum: ["Technical", "Project", "Core CS", "Behavioral"],
            required: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        expectedTopics: {
            type: [String],
            default: [],
        },

        answer: {
            type: String,
            default: "",
        },

        score: {
            type: Number,
            default: 0,
            min: 0,
            max: 10,
        },

        feedback: {
            type: String,
            default: "",
        },

        idealAnswer: {
            type: String,
            default: "",
        },

        strengths: {
            type: [String],
            default: [],
        },

        improvements: {
            type: [String],
            default: [],
        },

        timeTaken: {
            type: Number,
            default: 0,
        },
    },
    {
        _id: false,
    }
);

const reportSchema = new mongoose.Schema(
    {
        overallScore: {
            type: Number,
            default: 0,
        },

        technicalScore: {
            type: Number,
            default: 0,
        },

        projectScore: {
            type: Number,
            default: 0,
        },

        coreCSScore: {
            type: Number,
            default: 0,
        },

        behavioralScore: {
            type: Number,
            default: 0,
        },

        strengths: {
            type: [String],
            default: [],
        },

        weakTopics: {
            type: [String],
            default: [],
        },

        roadmap: {
            type: [String],
            default: [],
        },
    },
    {
        _id: false,
    }
);

const interviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        resume: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Resume",
            required: true,
        },

        role: {
            type: String,
            required: true,
            trim: true,
        },

        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },

        questions: {
            type: [questionSchema],
            default: [],
        },

        currentQuestion: {
            type: Number,
            default: 0,
        },

        status: {
            type: String,
            enum: ["Pending", "In Progress", "Completed"],
            default: "Pending",
        },

        report: {
            type: reportSchema,
            default: () => ({}),
        },
    },
    {
        timestamps: true,
    }
);

const Interview = mongoose.model("Interview", interviewSchema);

export default Interview;