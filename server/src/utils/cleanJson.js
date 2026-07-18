export const cleanJsonResponse = (text) => {
    return text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
};