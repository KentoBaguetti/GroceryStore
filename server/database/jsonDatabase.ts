import { Product, Ingredient } from "./models/tempProducts";
import { User } from "./models/tempUsers";

const ingredientsList = [
  new Ingredient("Flour", 1, "kg"),
  new Ingredient("Sugar", 0.5, "kg"),
  new Ingredient("Butter", 0.2, "kg"),
  new Ingredient("Salt", 0.01, "kg"),
  new Ingredient("Eggs", 6, "pieces"),
  new Ingredient("Milk", 1, "liter"),
  new Ingredient("Vanilla", 0.05, "liter"),
  new Ingredient("Chocolate", 0.3, "kg"),
  new Ingredient("Baking Powder", 0.02, "kg"),
  new Ingredient("Yeast", 0.01, "kg"),
  new Ingredient("Tomato Sauce", 0.5, "liter"),
  new Ingredient("Cheese", 0.4, "kg"),
  new Ingredient("Pepperoni", 0.3, "kg"),
  new Ingredient("Olives", 0.1, "kg"),
  new Ingredient("Onions", 0.2, "kg"),
];

// Create some sample products
const productsList = [
  new Product(1, "Chocolate Cake", 15.99, "Delicious chocolate cake", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[5],
    ingredientsList[7],
    ingredientsList[8],
  ]),
  new Product(2, "Vanilla Cake", 13.99, "Vanilla flavored cake", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[5],
    ingredientsList[6],
    ingredientsList[8],
  ]),
  new Product(3, "Bread", 2.99, "Freshly baked bread", [
    ingredientsList[0],
    ingredientsList[2],
    ingredientsList[9],
    ingredientsList[5],
    ingredientsList[3],
  ]),
  new Product(4, "Pizza", 8.99, "Cheesy pepperoni pizza", [
    ingredientsList[0],
    ingredientsList[10],
    ingredientsList[11],
    ingredientsList[12],
    ingredientsList[13],
    ingredientsList[14],
  ]),
  new Product(5, "Muffin", 3.99, "Blueberry muffin", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[5],
    ingredientsList[8],
  ]),
  new Product(6, "Pancakes", 5.99, "Stack of pancakes", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[5],
    ingredientsList[6],
  ]),
  new Product(7, "Croissant", 2.49, "Buttery croissant", [
    ingredientsList[0],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[3],
  ]),
  new Product(8, "Cupcake", 4.99, "Sweet cupcake", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[6],
  ]),
  new Product(9, "Doughnut", 1.99, "Glazed doughnut", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[8],
  ]),
  new Product(10, "Bagel", 1.49, "Fresh bagel", [
    ingredientsList[0],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[9],
    ingredientsList[3],
  ]),
  new Product(11, "Cinnamon Roll", 3.49, "Cinnamon roll with icing", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[6],
    ingredientsList[8],
  ]),
  new Product(12, "Brownie", 2.99, "Chocolate brownie", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[7],
    ingredientsList[8],
  ]),
  new Product(13, "Cookies", 1.99, "Chocolate chip cookies", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[7],
  ]),
  new Product(14, "Cheesecake", 14.99, "Creamy cheesecake", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[6],
    ingredientsList[11],
  ]),
  new Product(15, "Macarons", 8.99, "Colorful macarons", [
    ingredientsList[0],
    ingredientsList[1],
    ingredientsList[2],
    ingredientsList[4],
    ingredientsList[6],
  ]),
];

interface DB {
  products: {
    [key: number]: Product;
  };
  users: {
    [key: number]: User;
  };
}

const Database: DB = {
  products: {},
  users: {},
};

productsList.forEach((product) => {
  Database.products[product.getID()] = product;
});

export { Database, ingredientsList };
