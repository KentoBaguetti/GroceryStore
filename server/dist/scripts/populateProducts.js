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
const mongoose_1 = __importDefault(require("mongoose"));
const productModel_1 = __importDefault(require("../database/models/productModel"));
const additionalConnection_1 = __importDefault(require("../database/additionalConnection"));
const productsData = [
    {
        id: 1,
        name: "Apple",
        price: 1.2,
        description: "Fresh red apple",
        ingredients: [],
    },
    {
        id: 2,
        name: "Banana",
        price: 0.5,
        description: "Organic bananas",
        ingredients: [],
    },
    {
        id: 3,
        name: "Milk",
        price: 1.5,
        description: "1 gallon of whole milk",
        ingredients: ["Milk"],
    },
    {
        id: 4,
        name: "Bread",
        price: 2.0,
        description: "Whole grain bread",
        ingredients: ["Wheat flour", "Water", "Yeast", "Salt"],
    },
    {
        id: 5,
        name: "Eggs",
        price: 2.5,
        description: "Dozen large eggs",
        ingredients: ["Eggs"],
    },
    {
        id: 6,
        name: "Chicken Breast",
        price: 5.0,
        description: "Boneless, skinless chicken breast",
        ingredients: ["Chicken"],
    },
    {
        id: 7,
        name: "Butter",
        price: 3.0,
        description: "Unsalted butter",
        ingredients: ["Cream"],
    },
    {
        id: 8,
        name: "Cheese",
        price: 4.0,
        description: "Cheddar cheese",
        ingredients: ["Milk", "Salt", "Enzymes"],
    },
    {
        id: 9,
        name: "Carrots",
        price: 1.0,
        description: "Fresh carrots",
        ingredients: [],
    },
    {
        id: 10,
        name: "Tomatoes",
        price: 1.5,
        description: "Organic tomatoes",
        ingredients: [],
    },
    {
        id: 11,
        name: "Orange Juice",
        price: 3.5,
        description: "100% pure orange juice",
        ingredients: ["Orange juice"],
    },
    {
        id: 12,
        name: "Yogurt",
        price: 1.0,
        description: "Strawberry flavored yogurt",
        ingredients: ["Milk", "Strawberries", "Sugar", "Live cultures"],
    },
    {
        id: 13,
        name: "Rice",
        price: 2.0,
        description: "Long grain white rice",
        ingredients: ["Rice"],
    },
    {
        id: 14,
        name: "Pasta",
        price: 1.5,
        description: "Spaghetti pasta",
        ingredients: ["Durum wheat semolina", "Water"],
    },
    {
        id: 15,
        name: "Olive Oil",
        price: 6.0,
        description: "Extra virgin olive oil",
        ingredients: ["Olive oil"],
    },
];
const populateProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield (0, additionalConnection_1.default)();
        for (const productData of productsData) {
            const product = new productModel_1.default(productData);
            yield product.save();
            console.log(`Saved product: ${product.name}`);
        }
        yield mongoose_1.default.disconnect();
        console.log("Database connection closed");
    }
    catch (error) {
        console.error("Error populating products:", error);
    }
});
populateProducts();
