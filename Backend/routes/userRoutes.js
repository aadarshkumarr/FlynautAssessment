const express = require("express");
const {
	Register,
	LoginAuth,
	SearchResult,
} = require("../controllers/userControllers");
const ProtectRoute = require("../middleware/authMiddleware");
const passport = require("../passport");

const router = express.Router();

router.post("/", Register);
router.post("/login", LoginAuth);
router.get("/", passport.authenticate("jwt", { session: false }), SearchResult);

module.exports = router;
