import express, { Express, Request, Response } from "express";
import axios from "axios";
import { getProductById } from "./database/productFunctions";
import connectToDB from "./database/database";

const router = express.Router();

connectToDB();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

router.get("/product/:id", getProductById);

export default router;
