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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = require("./auth/auth");
const authMiddleware_1 = __importDefault(require("./auth/authMiddleware"));
const validationMiddleware_1 = require("./auth/validationMiddleware"); // Assuming you have this validation file
dotenv_1.default.config();
const uri = process.env.MONGO_URI || "mongodb://localhost:27017/GroceryStoreDatabase";
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            console.log("Connected to the Database");
        }
        catch (error) {
            if (error instanceof Error) {
                console.log(`Error connecting to the database: ${error.message}`);
            }
            else {
                console.log(`Unexpected error: ${error}`);
            }
        }
    });
}
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
connectToDB();
app.post("/register", validationMiddleware_1.validateRegistration, auth_1.register);
app.post("/login", auth_1.login);
// Example of a protected route
app.get("/protected", authMiddleware_1.default, (req, res) => {
    res.send("This is a protected route.");
});
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.default = connectToDB;
