import { Database, ingredientsList } from "./jsonDatabase";
import { Product, Ingredient } from "./tempProducts";
import { Request, Response } from "express";

const getProductsLength = (): number => {
  return Object.keys(Database.products).length;
};

const addProduct = (
  name: string,
  price: number,
  description: string,
  ingredients: Ingredient[]
): void => {
  const id: number = getProductsLength() + 1;
  const product: Product = new Product(
    id,
    name,
    price,
    description,
    ingredients
  );
  Database.products[id] = product;
};

const getProductById = (
  id: number
): { product: Product | null; error: string | null } => {
  if (isNaN(id) || id < 1 || id > getProductsLength()) {
    return { product: null, error: "Invalid product ID" };
  }

  const product: Product = Database.products[id];

  if (!product) {
    return {
      product: null,
      error: "Product not found",
    };
  }

  return {
    product,
    error: null,
  };
};

export { addProduct, getProductById };
