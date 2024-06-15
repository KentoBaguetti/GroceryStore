"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductById = exports.addProduct = void 0;
const jsonDatabase_1 = require("./jsonDatabase");
const tempProducts_1 = require("./models/tempProducts");
const getProductsLength = () => {
    return Object.keys(jsonDatabase_1.Database.products).length;
};
const addProduct = (name, price, description, ingredients) => {
    const id = getProductsLength() + 1;
    const product = new tempProducts_1.Product(id, name, price, description, ingredients);
    jsonDatabase_1.Database.products[id] = product;
};
exports.addProduct = addProduct;
// const getProductById = (
//   id: number
// ): { product: Product | null; error: string | null } => {
//   if (isNaN(id) || id < 1 || id > getProductsLength()) {
//     return { product: null, error: "Invalid product ID" };
//   }
//   const product: Product = Database.products[id];
//   if (!product) {
//     return {
//       product: null,
//       error: "Product not found",
//     };
//   }
//   return {
//     product,
//     error: null,
//   };
// };
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id > getProductsLength()) {
        res.status(400).send("Invalid product ID");
    }
    const product = jsonDatabase_1.Database.products[id];
    res.status(200).json(product);
});
exports.getProductById = getProductById;
