"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.cookies.userCookie.token;
    if (!authHeader) {
        res.status(403).json({ error: "Access denied. Token not provided" });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        console.log(decoded);
        next();
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: "Invalid token" });
            return;
        }
        res.status(400).json({ error: "Access denied: Unexpected Error" });
        return;
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    authMiddleware(req, res, () => {
        if (req.user.role !== "admin") {
            res.status(403).json({ error: "Access denied, invalid role" });
            return;
        }
        next();
    });
};
exports.adminMiddleware = adminMiddleware;
