import express, { Express, Request, Response } from "express";
import axios from "axios";
import {
  getProductById,
  getProductsByCategory,
  addProduct,
} from "./database/productFunctions";
import connectToDB from "./database/database";
import { register } from "./database/auth/auth";

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
router.post("/register", register);

export default router;
