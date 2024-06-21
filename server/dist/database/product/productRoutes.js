"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productController_1 = require("./productController");
const authMiddleware_1 = __importDefault(require("../auth/authMiddleware"));
const router = (0, express_1.Router)();
router.post("/products", authMiddleware_1.default, productController_1.addProduct);
router.get("/products", productController_1.getProducts);
router.get("/products/:id", productController_1.getProductById);
router.get("/products/category/:category", productController_1.getProductsByCategory);
router.put("/products/:id", authMiddleware_1.default, productController_1.updateProduct);
router.delete("/products/:id", authMiddleware_1.default, productController_1.deleteProduct);
exports.default = router;
