const { Router } = require("express");
const router = Router();

// Controllers
const controller = require("../controller/item");

// Routes
router.post("/createItem",controller.createItem)
router.get("/getAllItems",controller.getItems)
router.delete("/deleteItem/:id",controller.deleteItem)

module.exports = router;
