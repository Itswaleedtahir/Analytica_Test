const { Router } = require("express");
const router = Router();

// Middlewares

// Controllers
const controller = require("../controller/Prompt");
// Routes

router.post("/generatePrompt",controller.generatePrompt)

module.exports = router;
