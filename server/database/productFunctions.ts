import Product, { IProduct } from "./models/productModel";
import { Request, Response } from "express";

// This set will hold each valid "category" of item. When a new product is added, if the given category is not in the set, dont add it and send an error
const categorySet = new Set<string>();
const categoryArr = [
  "Fruits",
  "Candy",
  "Dairy",
  "Bakery",
  "SeaFood",
  "Snacks",
  "Beverages",
  "Pantry",
];

for (let i = 0; i < categoryArr.length; i++) {
  categorySet.add(categoryArr[i]);
}

/**
 *
 * @returns the number of products in the Product collection
 */
const numberOfProducts = async (): Promise<number> => {
  return await Product.countDocuments({});
};

/**
 *
 * @param req - Holds a 'name' field used to query through the products for the right one
 * @param res - sends the found product as a response
 */
const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);

  try {
    const product: IProduct | null = await Product.findOne({ id });

    if (!product) {
      res.status(404).json({ error: "Product not found" });
      return;
    }

    res.status(200).json(product);
  } catch (err) {
    if (isNaN(id)) {
      console.error("Given ID is not a number");
      res.status(400).json({ error: "400 Bad request" });
      return;
    } else {
      console.error("Error retrieving product:", err);
      res.status(500).json({ error: "Server error" });
      return;
    }
  }
};

/**
 *
 * req.body template: {
 *  "name" : "Calipico",
 *  "category": "Beverages"
 *  "price" : 2.99,
 *  "description" : "Japanese Soda",
 *  "ingredients": ["Water", "Japanese power"]
 * }
 *
 * @param req - body contains data that will be added to the database
 * @param res
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

export { getProductById, addProduct };
