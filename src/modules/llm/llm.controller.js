import * as llmService from "./llm.service.js";

export const summarize = async (req, res) => {

    try {

        const { text } = req.body;

        // 1️⃣ Missing text
        if (!text || typeof text !== "string" || text.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Text is required and cannot be empty."
            });
        }

        // 2️⃣ Too short
        if (text.length < 50) {
            return res.status(400).json({
                success: false,
                message: "Text must be at least 50 characters."
            });
        }

        // 3️⃣ Too large
        if (text.length > 12000) {
            return res.status(413).json({
                success: false,
                message: "Text too large. Maximum 12,000 characters allowed."
            });
        }

        // Call service
        const result = await llmService.summarizeText(text);

        return res.status(200).json({
            summary: result.summary,
            model: result.model
        });

    } catch (error) {

        return res.status(error.status || 500).json({
            success: false,
            message: error.message || "Internal server error"
        });

    }
};