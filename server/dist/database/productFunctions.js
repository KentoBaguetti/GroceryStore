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
exports.addProduct = exports.getProductsByCategory = exports.getProductById = void 0;
const productModel_1 = __importDefault(require("./models/productModel"));
// This set will hold each valid "category" of item. When a new product is added, if the given category is not in the set, dont add it and send an error
const categorySet = new Set([
    "Fruits",
    "Candy",
    "Dairy",
    "Bakery",
    "SeaFood",
    "Snacks",
    "Beverages",
    "Pantry",
]);
const numberOfProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.countDocuments({});
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number.parseInt(req.params.id);
    try {
        const product = yield productModel_1.default.findOne({ id });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        return res.status(200).json(product);
    }
    catch (err) {
        if (Number.isNaN(id)) {
            console.error("Given ID is not a number");
            return res.status(400).json({ error: "400 Bad request" });
        }
        console.error("Error retrieving product:", err);
        return res.status(500).json({ error: "Server error" });
    }
});
exports.getProductById = getProductById;
const getProductsByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    try {
        if (!category || !categorySet.has(category)) {
            return res.status(400).json({ error: "Enter a valid category" });
        }
        const products = yield productModel_1.default.find({ category });
        if (!products) {
            return res.status(404).json({
                error: `Could not find any products in the category "${category}"`,
            });
        }
        return res
            .status(200)
            .json({ products, message: "Successfully fetched products" });
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`Error fetching products by category: ${error.message}`);
            return res
                .status(500)
                .json({ error: "Error fetching products by category" });
        }
        return res.status(500).json({ error: "An unexpected error has occured" });
    }
});
exports.getProductsByCategory = getProductsByCategory;
/**
 * req.body template: {
 *  "name" : "Calipico",
 *  "category": "Beverages"
 *  "price" : 2.99,
 *  "description" : "Japanese Soda",
 *  "ingredients": ["Water", "Japanese power"]
 * }
 */
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, description, ingredients, } = req.body;
    try {
        // Validate the request body
        if (!name ||
            !category ||
            !price ||
            !description ||
            !ingredients ||
            !Array.isArray(ingredients)) {
            return res
                .status(400)
                .json({ error: "Missing or invalid fields in the request body" });
        }
        if (typeof price !== "number" || price < 0) {
            return res.status(400).json({ error: "Price must be a postive number" });
        }
        if (!categorySet.has(category)) {
            return res
                .status(400)
                .json({ error: "Please give a valid category for the product" });
        }
        const id = (yield numberOfProducts()) + 1;
        const newProduct = new productModel_1.default({
            id,
            name,
            category,
            price,
            description,
            ingredients,
        });
        yield newProduct.save();
        return res
            .status(201)
            .json({ message: `Product added successfully: Product id ${id}` });
    }
    catch (error) {
        if (error instanceof Error) {
            console.error("Error adding product to database");
            return res.status(500).json({ error });
        }
        console.error("An unexpected error has occured");
        return res.status(500).json({ error: "An unexpected error has occured" });
    }
});
exports.addProduct = addProduct;
