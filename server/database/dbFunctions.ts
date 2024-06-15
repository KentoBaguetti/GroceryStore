import { Database, ingredientsList } from "./jsonDatabase";
import { Product, Ingredient } from "./tempProducts";

const getProductsLength = (): number => {
  return Object.keys(Database.products).length;
};

/**
 *
 * @param name
 * @param price
 * @param description
 * @param ingredients
 * @returns void
 */
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

const getProductById = (id: number): Product => {
  return Database.products[id];
};

export { addProduct, getProductById };
