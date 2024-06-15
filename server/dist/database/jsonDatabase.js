"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const tempProducts_1 = require("./tempProducts");
const ingredientsList = [
    new tempProducts_1.Ingredient("Flour", 1, "kg"),
    new tempProducts_1.Ingredient("Sugar", 0.5, "kg"),
    new tempProducts_1.Ingredient("Butter", 0.2, "kg"),
    new tempProducts_1.Ingredient("Salt", 0.01, "kg"),
    new tempProducts_1.Ingredient("Eggs", 6, "pieces"),
    new tempProducts_1.Ingredient("Milk", 1, "liter"),
    new tempProducts_1.Ingredient("Vanilla", 0.05, "liter"),
    new tempProducts_1.Ingredient("Chocolate", 0.3, "kg"),
    new tempProducts_1.Ingredient("Baking Powder", 0.02, "kg"),
    new tempProducts_1.Ingredient("Yeast", 0.01, "kg"),
    new tempProducts_1.Ingredient("Tomato Sauce", 0.5, "liter"),
    new tempProducts_1.Ingredient("Cheese", 0.4, "kg"),
    new tempProducts_1.Ingredient("Pepperoni", 0.3, "kg"),
    new tempProducts_1.Ingredient("Olives", 0.1, "kg"),
    new tempProducts_1.Ingredient("Onions", 0.2, "kg"),
];
// Create some sample products
const productsList = [
    new tempProducts_1.Product(1, "Chocolate Cake", 15.99, "Delicious chocolate cake", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[5],
        ingredientsList[7],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(2, "Vanilla Cake", 13.99, "Vanilla flavored cake", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[5],
        ingredientsList[6],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(3, "Bread", 2.99, "Freshly baked bread", [
        ingredientsList[0],
        ingredientsList[2],
        ingredientsList[9],
        ingredientsList[5],
        ingredientsList[3],
    ]),
    new tempProducts_1.Product(4, "Pizza", 8.99, "Cheesy pepperoni pizza", [
        ingredientsList[0],
        ingredientsList[10],
        ingredientsList[11],
        ingredientsList[12],
        ingredientsList[13],
        ingredientsList[14],
    ]),
    new tempProducts_1.Product(5, "Muffin", 3.99, "Blueberry muffin", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[5],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(6, "Pancakes", 5.99, "Stack of pancakes", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[5],
        ingredientsList[6],
    ]),
    new tempProducts_1.Product(7, "Croissant", 2.49, "Buttery croissant", [
        ingredientsList[0],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[3],
    ]),
    new tempProducts_1.Product(8, "Cupcake", 4.99, "Sweet cupcake", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[6],
    ]),
    new tempProducts_1.Product(9, "Doughnut", 1.99, "Glazed doughnut", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(10, "Bagel", 1.49, "Fresh bagel", [
        ingredientsList[0],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[9],
        ingredientsList[3],
    ]),
    new tempProducts_1.Product(11, "Cinnamon Roll", 3.49, "Cinnamon roll with icing", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[6],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(12, "Brownie", 2.99, "Chocolate brownie", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[7],
        ingredientsList[8],
    ]),
    new tempProducts_1.Product(13, "Cookies", 1.99, "Chocolate chip cookies", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[7],
    ]),
    new tempProducts_1.Product(14, "Cheesecake", 14.99, "Creamy cheesecake", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[6],
        ingredientsList[11],
    ]),
    new tempProducts_1.Product(15, "Macarons", 8.99, "Colorful macarons", [
        ingredientsList[0],
        ingredientsList[1],
        ingredientsList[2],
        ingredientsList[4],
        ingredientsList[6],
    ]),
];
const Database = {
    products: {},
};
exports.Database = Database;
productsList.forEach((product) => {
    Database.products[product.getID()] = product;
});
console.log(Database);
