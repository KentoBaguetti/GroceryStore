import express, { Express, Request, Response } from "express";
import axios from "axios";
import { addProduct, getProductById } from "./database/dbFunctions";
import { Product } from "./database/tempProducts";

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "'/' Active",
  });
});

router.get("/product/:id", (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id);
  const { product, error }: { product: Product | null; error: string | null } =
    getProductById(id);

  if (error) {
    return res.status(400).send(error);
  }

  if (!product) {
    return res.status(404).send("Product not found");
  }

  res.status(200).json(product);
});

export default router;
