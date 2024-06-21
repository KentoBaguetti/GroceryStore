import express, { Express, type Request, type Response } from "express";
import axios from "axios";
import connectToDB from "./database/database";
import { register, login } from "./database/auth/auth";
import { validateRegistration } from "./database/auth/validationMiddleware";
import authMiddleware from "./database/auth/authMiddleware";

const router = express.Router();

connectToDB();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

// API endpoints for Products

// API endpoints for auth
router.post("/register", validateRegistration, register);

router.post("/login", login);

router.get("/protected", authMiddleware, (req: Request, res: Response) => {
  console.log("This is a protected route");
  return res.status(200).json({ message: "You've accessed a proteced route" });
});

export default router;
