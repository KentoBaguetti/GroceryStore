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

const getProductById = async (req: Request, res: Response): Promise<void> => {
  const id: number = parseInt(req.params.id);
  if (isNaN(id) || id < 0 || id > getProductsLength()) {
    res.status(400).send("Invalid product ID");
  }

  const product: Product = Database.products[id];

  res.status(200).json(product);
};

export { addProduct, getProductById };
