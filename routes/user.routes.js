import express from "express";
import { registerUser, authUser } from "../controllers/user.controllers.js";

const router = express.Router();

router.post("/user/register", registerUser);
router.post("/user/login", authUser);

export default router;