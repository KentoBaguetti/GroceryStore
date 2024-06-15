import { Product, Ingredient } from "./tempProducts";

interface DB {
  products: {
    [key: number]: Product;
  };
}

const Database: DB = {
  products: {},
};
