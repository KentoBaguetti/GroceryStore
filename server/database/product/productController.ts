import { Request, Response } from "express";
import Product, { IProduct } from "./productModel";

const addProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id, name, category, price, description, ingredients }: IProduct = req.body;

  try {
    const existingProduct = await Product.findOne({ id });
    if (existingProduct) {
      return res.status(400).json({ error: "Product with this ID already exists" });
    }

    const newProduct = new Product({
      id,
      name,
      category,
      price,
      description,
      ingredients
    });

    await newProduct.save();

    return res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getProducts = async (req: Request, res: Response): Promise<Response> => {
  try {
    const products = await Product.find();
    return res.status(200).json(products);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const getProductById = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json(product);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const updateProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOneAndUpdate({ id: parseInt(id) }, updates, { new: true });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const deleteProduct = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ id: parseInt(id) });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

export { addProduct, getProducts, getProductById, updateProduct, deleteProduct };