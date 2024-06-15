import mongoose from "mongoose";
import Product, { IProduct } from "./models/productModel";
import { Request, Response } from "express";

const numberOfProducts = async (): Promise<number> => {
  const count: number = await Product.countDocuments({});
  return count;
};

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);

  if (isNaN(id) || id < 0 || id > (await numberOfProducts())) {
    res.send(400).send("Invalid product ID");
  }

  const product: IProduct | null = await Product.findOne({ id });

  if (!product) {
    res.send(404).send("Product not found");
  }

  res.send(200).json(product);
};

export { getProductById };
