import type { Request, Response } from "express";
import Product, { type IProduct } from "./productModel";

const categorySet = new Set<string>([
  "Fruits",
  "Candy",
  "Dairy",
  "Bakery",
  "SeaFood",
  "Snacks",
  "Beverages",
  "Pantry",
]);

const numberOfProducts = async (): Promise<number> => {
  return await Product.countDocuments({});
};

/**
 * req.body template: {
 *  "name" : "Calipico",
 *  "category": "Beverages"
 *  "price" : 2.99,
 *  "description" : "Japanese Soda",
 *  "ingredients": ["Water", "Japanese power"]
 * }
 */
const addProduct = async (req: Request, res: Response): Promise<Response> => {
  const {
    name,
    category,
    price,
    description,
    ingredients,
  }: {
    name: string;
    category: string;
    price: number;
    description: string;
    ingredients: string[];
  } = req.body;

  try {
    // Validate the request body
    if (
      !name ||
      !category ||
      !price ||
      !description ||
      !ingredients ||
      !Array.isArray(ingredients)
    ) {
      return res
        .status(400)
        .json({ error: "Missing or invalid fields in the request body" });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({ error: "Price must be a postive number" });
    }

    if (!categorySet.has(category)) {
      return res
        .status(400)
        .json({ error: "Please give a valid category for the product" });
    }

    const id = (await numberOfProducts()) + 1;

    const newProduct = new Product({
      id,
      name,
      category,
      price,
      description,
      ingredients,
    });

    await newProduct.save();

    return res
      .status(201)
      .json({ message: `Product added successfully: Product id ${id}` });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error adding product to database");
      return res.status(500).json({ error });
    }
    console.error("An unexpected error has occured");
    return res.status(500).json({ error: "An unexpected error has occured" });
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

const getProductsByCategory = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const category: string = req.params.category;
  try {
    if (!category || !categorySet.has(category)) {
      return res.status(400).json({ error: "Enter a valid category" });
    }

    const products: IProduct[] | null = await Product.find({ category });

    if (!products) {
      return res.status(404).json({
        error: `Could not find any products in the category "${category}"`,
      });
    }

    return res
      .status(200)
      .json({ products, message: "Successfully fetched products" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error fetching products by category: ${error.message}`);
      return res
        .status(500)
        .json({ error: "Error fetching products by category" });
    }
    return res.status(500).json({ error: "An unexpected error has occured" });
  }
};

const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = Number.parseInt(req.params.id);

  try {
    const product: IProduct | null = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    if (Number.isNaN(id)) {
      console.error("Given ID is not a number");
      return res.status(400).json({ error: "400 Bad request" });
    }
    console.error("Error retrieving product:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const product = await Product.findOneAndUpdate(
      { id: Number.parseInt(id) },
      updates,
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product updated successfully", product });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;

  try {
    const product = await Product.findOneAndDelete({ id: Number.parseInt(id) });
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

export {
  addProduct,
  getProducts,
  getProductsByCategory,
  getProductById,
  updateProduct,
  deleteProduct,
};
