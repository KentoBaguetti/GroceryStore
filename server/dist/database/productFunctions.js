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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.getProductById = void 0;
const productModel_1 = __importDefault(require("./models/productModel"));
/**
 *
 * @returns the number of products in the Product collection
 */
const numberOfProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.countDocuments({});
});
/**
 *
 * @param req - Holds a 'name' field used to query through the products for the right one
 * @param res - sends the found product as a response
 */
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const product = yield productModel_1.default.findOne({ id });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }
        res.status(200).json(product);
    }
    catch (err) {
        if (isNaN(id)) {
            console.error("Given ID is not a number");
            res.status(400).json({ error: "400 Bad request" });
            return;
        }
        else {
            console.error("Error retrieving product:", err);
            res.status(500).json({ error: "Server error" });
            return;
        }
    }
});
exports.getProductById = getProductById;
/**
 *
 * req.body template: {
 *  "name" : "Calipico",
 *  "price" : 2.99,
 *  "description" : "Japanese Soda",
 *  "ingredients": ["Water", "Japanese power"]
 * }
 *
 * @param req - body contains data that will be added to the database
 * @param res
 */
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, price, description, ingredients, } = req.body;
    try {
        // Validate the request body
        if (!name ||
            !price ||
            !description ||
            !ingredients ||
            !Array.isArray(ingredients)) {
            res
                .status(400)
                .json({ error: "Missing or invalid fields in the request body" });
            return;
        }
        if (typeof price !== "number" || price < 0) {
            res.status(400).json({ error: "Price must be a postive number" });
        }
        const id = (yield numberOfProducts()) + 1;
        const newProduct = new productModel_1.default({
            id,
            name,
            price,
            description,
            ingredients,
        });
        yield newProduct.save();
        res
            .status(201)
            .json({ message: `Product added successfully: Product id ${id}` });
    }
    catch (error) {
        console.log(`Error adding new product: ${error}`);
        if (error.name === "ValidationError") {
            res.status(400).json({ error: error.mesesage });
        }
        else {
            res.status(500).send("Failed to add product");
        }
    }
});
exports.addProduct = addProduct;
