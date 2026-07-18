import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        fileName: {
            type: String,
            required: true,
        },

        fileUrl: {
            type: String,
            required: true,
        },

        imageKitFileId: {
            type: String,
            required: true,
        },

    parsedData: {
    skills: [String],

    projects: [
        {
            name: String,
            technologies: [String],
            description: String
        }
    ],

    experience: [
        {
            company: String,
            role: String,
            duration: String,
            description: String
        }
    ],

    education: [
        {
            institute: String,
            degree: String,
            period: String,
            grade: String
        }
    ],

    certifications: [
        {
            name: String,
            issuer: String,
            date: String
        }
    ]
},
   },

    {
        timestamps: true,
    }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;