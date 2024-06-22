"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = __importDefault(require("./routes"));
const productRoutes_1 = __importDefault(require("./database/product/productRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
const PORT = 3001;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use(routes_1.default);
app.use(productRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server running on: ${PORT}`);
});
exports.default = app;
