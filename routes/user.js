import express from "express";
import { getMyProfile, login, logout, register } from "../controller/user.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/me", isAuthenticated, getMyProfile);
router.get("/logout", isAuthenticated, logout);

export default router;
