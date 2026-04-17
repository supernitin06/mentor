import * as llmService from "./llm.service.js";

export const summarize = async (req, res) => {
  try {
    const { text } = req.body;

    console.log("Received Payload:", req.body);

    // 1️⃣ Validate input exists
    if (!text || typeof text !== "string") {
      return res.status(400).json({
        success: false,
        message: "Text is required and must be a string."
      });
    }

    const cleanText = text.trim();

    console.log("Cleaned Text:", cleanText);

    if (cleanText.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Text cannot be empty."
      });
    }

    // 2️⃣ Minimum length check (FIXED)
    if (cleanText.length  < 5) {
      return res.status(400).json({
        success: false,
        message: "Text must be at least 5 characters long."
      });
    }

    // 3️⃣ Maximum length check
    if (cleanText.length > 12000) {
      return res.status(413).json({
        success: false,
        message: "Text too large. Maximum 12,000 characters allowed."
      });
    }

    // 4️⃣ Call LLM service
    const result = await llmService.summarizeText(cleanText);

    // 5️⃣ Safety check
    if (!result || !result.summary) {
      return res.status(502).json({
        success: false,
        message: "Failed to generate summary from LLM."
      });
    }

    return res.status(200).json({
      success: true,
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