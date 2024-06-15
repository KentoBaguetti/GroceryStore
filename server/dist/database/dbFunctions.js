"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.addProduct = void 0;
const jsonDatabase_1 = require("./jsonDatabase");
const tempProducts_1 = require("./tempProducts");
const getProductsLength = () => {
    return Object.keys(jsonDatabase_1.Database.products).length;
};
/**
 *
 * @param name
 * @param price
 * @param description
 * @param ingredients
 * @returns void
 */
const addProduct = (name, price, description, ingredients) => {
    const id = getProductsLength() + 1;
    const product = new tempProducts_1.Product(id, name, price, description, ingredients);
    jsonDatabase_1.Database.products[id] = product;
};
exports.addProduct = addProduct;
const getProductById = (id) => {
    return jsonDatabase_1.Database.products[id];
};
exports.getProductById = getProductById;
