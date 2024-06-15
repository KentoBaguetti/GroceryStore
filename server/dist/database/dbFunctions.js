"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.addProduct = void 0;
const jsonDatabase_1 = require("./jsonDatabase");
const tempProducts_1 = require("./tempProducts");
const getProductsLength = () => {
    return Object.keys(jsonDatabase_1.Database.products).length;
};
const addProduct = (name, price, description, ingredients) => {
    const id = getProductsLength() + 1;
    const product = new tempProducts_1.Product(id, name, price, description, ingredients);
    jsonDatabase_1.Database.products[id] = product;
};
exports.addProduct = addProduct;
const getProductById = (id) => {
    if (isNaN(id) || id < 1 || id > getProductsLength()) {
        return { product: null, error: "Invalid product ID" };
    }
    const product = jsonDatabase_1.Database.products[id];
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
exports.getProductById = getProductById;
