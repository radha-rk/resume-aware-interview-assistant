// ----------------------
// Resume Parser Prompt
// ----------------------

export const resumeParserPrompt = (resumeText) => `
You are an expert ATS Resume Parser.

Analyze the resume and return ONLY valid JSON.

Do NOT return markdown.
Do NOT return explanations.
Do NOT omit fields.

Return EXACTLY this structure:

{
  "skills": ["string"],

  "projects": [
    {
      "name": "string",
      "technologies": ["string"],
      "description": "string"
    }
  ],

  "experience": [
    {
      "company": "string",
      "role": "string",
      "duration": "string",
      "description": "string"
    }
  ],

  "education": [
    {
      "institute": "string",
      "degree": "string",
      "period": "string",
      "grade": "string"
    }
  ],

  "certifications": [
    {
      "name": "string",
      "issuer": "string",
      "date": "string"
    }
  ]
}

If a field is missing, return an empty array.

Resume:

${resumeText}
`;

// ----------------------
// Interview Generation Prompt
// ----------------------

export const interviewPrompt = ( parsedResume,role,difficulty   ) => `
You are a Senior Software Engineer conducting a technical interview.

Candidate Resume:

${JSON.stringify(parsedResume, null, 2)}

Target Role:

${role}

Difficulty:

${difficulty}

Generate EXACTLY 12 interview questions.

Distribution:

- 5 Technical
- 3 Project
- 2 Core CS
- 2 Behavioral

Rules:

1. Technical questions should come from the candidate's skills.
2. Project questions should come from the candidate's projects.
3. Core CS questions should include DBMS, OOP, Operating System or Computer Networks depending on the role.
4. Behavioral questions should assess communication and problem-solving.
5. Do not repeat questions.
6. Match the selected difficulty.
7. Return ONLY valid JSON.

Return in this format:

[
  {
    "question": "",
    "type": "Technical",
    "difficulty": "${difficulty}",
    "expectedTopics": []
  }
]
`;


// ----------------------
// Answer Evaluation Prompt
// ----------------------

export const answerEvaluationPrompt = (question,expectedTopics, answer  
) => `
You are a Senior Software Engineer interviewing a candidate.

Question:

${question}

Expected Topics:

${expectedTopics.join(", ")}

Candidate Answer:

${answer}

Evaluate the answer objectively.

Score should be between 0 and 10.

Return ONLY valid JSON.

Format:

{
    "score": 0,
    "feedback": "",
    "idealAnswer": "",
    "strengths": [],
    "improvements": []
}
`;


// ----------------------
// Final Report Prompt
// ----------------------

export const finalReportPrompt = (questions) => `
You are a Senior Software Engineering Interviewer.

Analyze the following interview evaluation.

Interview Data:

${JSON.stringify(questions, null, 2)}

Generate an overall interview report.

Return ONLY valid JSON.

Format:

{
    "strengths": [],
    "weakTopics": [],
    "roadmap": []
}

Roadmap should contain actionable learning steps.

Example:

[
    "Revise DBMS normalization",
    "Practice JWT Authentication",
    "Study Redis caching",
    "Improve behavioral storytelling using STAR method"
]
`;