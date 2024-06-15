"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productFunctions_1 = require("./database/productFunctions");
const database_1 = __importDefault(require("./database/database"));
const router = express_1.default.Router();
(0, database_1.default)();
router.get("/", (req, res) => {
    res.json({
        message: "'/' Active",
    });
});
router.get("/product/:id", productFunctions_1.getProductById);
exports.default = router;
