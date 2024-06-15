import express, { Express, Request, Response } from "express";
import axios from "axios";
import { addProduct, getProductById } from "./database/dbFunctions";
import { Product } from "./database/models/tempProducts";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

router.get("/product/:id", getProductById);

export default router;
