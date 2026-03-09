import express from "express";
import * as sessionController from "./session.controller.js";

const router = express.Router();

/* #swagger.tags = ['Session'] */

router.post("/", sessionController.createSession);
router.get("/", sessionController.getAllSessions);
router.get("/lesson/:id", sessionController.getSessionsByLesson); // Specific route for lesson sessions
router.get("/:id", sessionController.getSessionById);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

export default router;
