const express = require("express");
const {
  AccessChat,
  fetchChats,
  createGroupChat,
  renameGroup,
  addToGroup,
  RemoveToGroup,
} = require("../controllers/chatControllers");
const ProtectRoute = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", ProtectRoute, AccessChat);
router.get("/", ProtectRoute, fetchChats);
router.post("/group", ProtectRoute, createGroupChat);
router.put("/rename", ProtectRoute, renameGroup);
router.put("/groupremove", ProtectRoute, RemoveToGroup);
router.put("/groupadd", ProtectRoute, addToGroup);

module.exports = router;
