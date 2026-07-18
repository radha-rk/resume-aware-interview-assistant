import { readFile } from "node:fs/promises";
import { PDFParse } from "pdf-parse";
import ApiError from "../utils/ApiError.js";

export const extractTextFromPDF = async (filePath) => {
    let parser;

    try {
        const buffer = await readFile(filePath);

        parser = new PDFParse({
            data: buffer,
        });

        const result = await parser.getText();

        return result.text;

    } catch (error) {
        console.error("PDF Parse Error:", error);
        throw new ApiError(500, "Failed to parse PDF");

    } finally {
        if (parser) {
            try {
                await parser.destroy();
            } catch (err) {
                console.error("Failed to destroy PDF parser:", err);
            }
        }
    }
};