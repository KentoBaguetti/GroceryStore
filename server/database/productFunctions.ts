import Product, { IProduct } from "./models/productModel";
import { Request, Response } from "express";

// This set will hold each valid "category" of item. When a new product is added, if the given category is not in the set, dont add it and send an error
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

const getProductById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id: number = parseInt(req.params.id);

  try {
    const product: IProduct | null = await Product.findOne({ id });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    return res.status(200).json(product);
  } catch (err) {
    if (isNaN(id)) {
      console.error("Given ID is not a number");
      return res.status(400).json({ error: "400 Bad request" });
    } else {
      console.error("Error retrieving product:", err);
      return res.status(500).json({ error: "Server error" });
    }
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
  } catch (error: any) {
    console.log(`Error fetching products by category: ${error.message}`);
    return res
      .status(500)
      .json({ error: "Error fetching products by category" });
  }
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
const addProduct = async (req: Request, res: Response): Promise<void> => {
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
      res
        .status(400)
        .json({ error: "Missing or invalid fields in the request body" });
      return;
    }

    if (typeof price !== "number" || price < 0) {
      res.status(400).json({ error: "Price must be a postive number" });
      return;
    }

    if (!categorySet.has(category)) {
      res
        .status(400)
        .json({ error: "Please give a valid category for the product" });
      return;
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

    res
      .status(201)
      .json({ message: `Product added successfully: Product id ${id}` });
  } catch (error: any) {
    console.log(`Error adding new product: ${error}`);

    if (error.name === "ValidationError") {
      res.status(400).json({ error: error.mesesage });
    } else {
      res.status(500).send("Failed to add product");
    }
  }
};

export { getProductById, getProductsByCategory, addProduct };
