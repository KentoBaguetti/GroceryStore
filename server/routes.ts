import express, { Express, Request, Response } from "express";
import axios from "axios";
import {
  getProductById,
  getProductsByCategory,
  addProduct,
} from "./database/productFunctions";
import connectToDB from "./database/database";
import { register, login } from "./database/auth/auth";
import { validateRegistration } from "./database/auth/validationMiddleware";

const router = express.Router();

connectToDB();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

// API endpoints for Products
router.get("/product/:id", getProductById);

router.get("/product/category/:category", getProductsByCategory);

router.post("/product/add", addProduct);

// API endpoints for auth
router.post("/register", validateRegistration, register);

export default router;
