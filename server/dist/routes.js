"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productFunctions_1 = require("./database/productFunctions");
const database_1 = __importDefault(require("./database/database"));
const auth_1 = require("./database/auth/auth");
const validationMiddleware_1 = require("./database/auth/validationMiddleware");
const router = express_1.default.Router();
(0, database_1.default)();
router.get("/", (req, res) => {
    res.json({
        message: "'/' Active",
    });
});
// API endpoints for Products
router.get("/product/:id", productFunctions_1.getProductById);
router.get("/product/category/:category", productFunctions_1.getProductsByCategory);
router.post("/product/add", productFunctions_1.addProduct);
// API endpoints for auth
router.post("/register", validationMiddleware_1.validateRegistration, auth_1.register);
exports.default = router;
