const { Router } = require("express");
const router = Router();

// Routers
const itemRouter = require("./item");
const promptRouter = require("./prompt");


router.use('/items', itemRouter);
router.use('/prompt', promptRouter);

module.exports = router;
