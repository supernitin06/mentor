import express from "express";
import rateLimit from "express-rate-limit";
import * as llmController from "./llm.controller.js";

const router = express.Router();

const summarizeLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: {
        success: false,
        message: "Too many requests. Please try again later."
    }
});

router.post("/summarize", summarizeLimiter, llmController.summarize);

export default router;