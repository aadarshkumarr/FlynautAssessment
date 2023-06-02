const express = require("express");
const { sendMessage, allMessage } = require("../controllers/messageController");
const ProtectRoute = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", ProtectRoute, sendMessage);
router.get("/:chatId", ProtectRoute, allMessage);

module.exports = router;
