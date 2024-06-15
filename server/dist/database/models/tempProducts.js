"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = exports.Ingredient = void 0;
class Product {
    constructor(id, name, price, description, ingredients) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.description = description;
        this.ingredients = ingredients;
    }
    getID() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getPrice() {
        return this.price;
    }
    getDescription() {
        return this.description;
    }
    getIngredients() {
        return this.ingredients;
    }
}
exports.Product = Product;
class Ingredient {
    constructor(name, quantity, unit) {
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
    }
    getName() {
        return this.name;
    }
    getQuantity() {
        return this.quantity;
    }
    getUnit() {
        return this.unit;
    }
}
exports.Ingredient = Ingredient;
