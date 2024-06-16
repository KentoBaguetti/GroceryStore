import express, { Express, Request, Response } from "express";
import axios from "axios";
import { getProductById, addProduct } from "./database/productFunctions";
import connectToDB from "./database/database";

const router = express.Router();

connectToDB();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

router.get("/product/:id", getProductById);

router.post("/product/add", addProduct);

export default router;
