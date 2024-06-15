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
exports.getProductById = void 0;
const productModel_1 = __importDefault(require("./models/productModel"));
const numberOfProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield productModel_1.default.countDocuments({});
    return count;
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 0 || id > (yield numberOfProducts())) {
        res.send(400).send("Invalid product ID");
    }
    const product = yield productModel_1.default.findOne({ id });
    if (!product) {
        res.send(404).send("Product not found");
    }
    res.send(200).json(product);
});
exports.getProductById = getProductById;
