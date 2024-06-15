import express, { Express, Request, Response } from "express";
import axios from "axios";
import { addProduct, getProductById } from "./database/dbFunctions";
import { Product } from "./database/tempProducts";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "/ Active",
  });
});

router.get("/product/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).send("Invalid product ID.");
  }

  const product: Product = getProductById(id);

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.status(200).json(product);
});

export default router;
