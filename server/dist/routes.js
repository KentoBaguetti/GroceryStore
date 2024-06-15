"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dbFunctions_1 = require("./database/dbFunctions");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    res.json({
        message: "'/' Active",
    });
});
router.get("/product/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { product, error } = (0, dbFunctions_1.getProductById)(id);
    if (error) {
        return res.status(400).send(error);
    }
    if (!product) {
        return res.status(404).send("Product not found");
    }
    res.status(200).json(product);
});
exports.default = router;
