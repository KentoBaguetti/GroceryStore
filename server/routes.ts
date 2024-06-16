import express, { Express, Request, Response } from "express";
import axios from "axios";
import {
  getProductById,
  getProductsByCategory,
  addProduct,
} from "./database/productFunctions";
import connectToDB from "./database/database";

const router = express.Router();

connectToDB();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

router.get("/product/:id", getProductById);

router.get("/product/category/:category", getProductsByCategory);

router.post("/product/add", addProduct);

export default router;
