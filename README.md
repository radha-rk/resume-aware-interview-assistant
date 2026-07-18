# 🎯 Resume-Aware Technical Interview Assistant

> An AI-powered technical interview platform that analyzes a candidate's resume, generates personalized interview questions using Gemini AI, evaluates answers in real time, and provides detailed performance reports with actionable feedback.

![Node.js](https://img.shields.io/badge/Node.js-22.x-green)
![Express](https://img.shields.io/badge/Express.js-Backend-black)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Gemini](https://img.shields.io/badge/Gemini-AI-blue)
![JWT](https://img.shields.io/badge/JWT-Authentication-orange)
![ImageKit](https://img.shields.io/badge/ImageKit-Storage-red)

---

# 📌 Overview

Preparing for technical interviews often requires questions that are relevant to a candidate's actual skills and projects. Generic interview platforms fail to personalize the interview experience.

This project solves that problem by combining resume analysis with Generative AI.

Users upload their resume, the system extracts structured information, generates personalized interview questions based on their skills and projects, evaluates every answer using Gemini AI, and finally produces a comprehensive interview report with scores, strengths, weaknesses, and a learning roadmap.

The goal is to simulate a realistic AI interviewer that adapts to each candidate.

---

# ✨ Features

## Authentication

- User Registration
- Secure Login
- JWT Authentication
- Protected APIs

---

## Resume Module

- Upload PDF Resume
- ImageKit Cloud Storage
- Resume Text Extraction
- AI Resume Parsing
- Structured Resume Data Storage

---

## AI Interview Generation

- Personalized Questions
- Resume-based Questions
- Project Questions
- Technical Questions
- Core CS Questions
- Behavioral Questions

Difficulty Levels

- Easy
- Medium
- Hard

---

## AI Answer Evaluation

Each submitted answer is evaluated for:

- Technical Accuracy
- Completeness
- Communication
- Understanding
- Relevance

Gemini AI returns

- Score
- Feedback
- Ideal Answer
- Strengths
- Improvements

---

## AI Interview Report

After completing the interview, the system generates

- Overall Score
- Technical Score
- Project Score
- Core CS Score
- Behavioral Score

Along with

- Strengths
- Weak Topics
- Personalized Learning Roadmap

---

# 🏗️ System Architecture

```
                Resume Upload
                      │
                      ▼
               ImageKit Storage
                      │
                      ▼
             PDF Text Extraction
                      │
                      ▼
              Gemini Resume Parser
                      │
                      ▼
            Structured Resume Data
                      │
                      ▼
          Interview Question Generator
                      │
                      ▼
             User Answers Questions
                      │
                      ▼
           Gemini Answer Evaluation
                      │
                      ▼
           Final Interview Report
                      │
                      ▼
                 MongoDB
```

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Multer
- ImageKit
- PDF-Parse
- Google Gemini API

---

## AI

- Gemini 3.1 Flash Lite
- Prompt Engineering
- Resume Parsing
- Question Generation
- Answer Evaluation
- Report Generation

---

## Tools

- Thunder Client
- Postman
- VS Code
- Git
- GitHub

---

# 📁 Project Structure

```
resume-aware-interview-assistant/

│
├── server/
│
│   ├── src/
│   │
│   ├── ai/
│   │   └── prompts.js
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │
│   ├── middleware/
│   │
│   ├── models/
│   │
│   ├── routes/
│   │
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── resume.service.js
│   │   ├── interview.service.js
│   │   ├── gemini.service.js
│   │   ├── interview.helper.js
│   │   ├── resume.helper.js
│   │   └── imagekit.service.js
│   │
│   ├── utils/
│   │
│   └── app.js
│
├── client/      (Coming Soon)
│
├── README.md
└── .gitignore
```

---

# 🔄 API Workflow

```
Register/Login
        │
        ▼
Upload Resume
        │
        ▼
Resume Parsing
        │
        ▼
Generate Interview
        │
        ▼
Get Current Question
        │
        ▼
Submit Answer
        │
        ▼
Gemini Evaluation
        │
        ▼
Repeat Until Complete
        │
        ▼
Generate Final Report
        │
        ▼
View Report
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint |
|----------|---------------------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Resume

| Method | Endpoint |
|----------|-------------------------|
| POST | /api/resume/upload |
| GET | /api/resume |
| GET | /api/resume/my |
| GET | /api/resume/:id |
| DELETE | /api/resume/:id |

---

## Interview

| Method | Endpoint |
|----------|--------------------------------|
| POST | /api/interview/generate |
| GET | /api/interview |
| GET | /api/interview/:id |
| GET | /api/interview/:id/current |
| POST | /api/interview/:id/answer |
| GET | /api/interview/:id/report |
| DELETE | /api/interview/:id |

---

# ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/radha-rk/resume-aware-interview-assistant.git
```

Move into the project

```bash
cd resume-aware-interview-assistant
```

Install backend dependencies

```bash
cd server
npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=3000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

JWT_EXPIRES_IN=7d

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=

GEMINI_API_KEY=

GEMINI_MODEL=gemini-3.1-flash-lite
```

Run the development server

```bash
npm run dev
```

---

# 🚀 Future Enhancements

- React Frontend
- Voice-based Interviews
- ATS Resume Scoring
- RAG-based Knowledge Base
- Company-Specific Interview Mode
- Coding Round Integration
- Interview History Dashboard
- Analytics & Progress Tracking
- Email Reports
- Admin Dashboard

---

# 📈 Current Status

### Backend

- ✅ Authentication
- ✅ Resume Upload
- ✅ Resume Parsing
- ✅ Interview Generation
- ✅ Answer Evaluation
- ✅ AI Report Generation
- ✅ REST APIs
- ✅ MongoDB Integration

### Frontend

- 🚧 In Progress

---

# 🤝 Contributing

Contributions, suggestions, and improvements are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

# 👩‍💻 Author

**Radha Kumari**

- GitHub: https://github.com/radha-rk
- LinkedIn: https://www.linkedin.com/in/radhakumari1311

