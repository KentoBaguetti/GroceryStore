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
exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const authHelper_1 = require("./authHelper");
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password, } = req.body;
    if (!username || !email || !password) {
        return res
            .status(400)
            .json({ error: "More user information is required for registration" });
    }
    try {
        const existingUsername = yield (0, authHelper_1.usernameExists)(username);
        const existingEmail = yield (0, authHelper_1.emailExists)(email);
        if (existingUsername) {
            return res.status(400).json({ error: "Username is already taken!" });
        }
        if (existingEmail) {
            return res.status(400).json({ error: "Email is already taken!" });
        }
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const newUser = new userModel_1.default({
            username,
            email,
            password: hashedPassword,
            salt,
            role: "normal",
            dateAndTimeCreated: new Date(),
            dateAndTimeLastLoggedIn: null,
        });
        yield newUser.save();
        return res.status(200).json({ message: "User successfully created!" });
        // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    }
    catch (error) {
        console.log(`Error registering a user: ${error.message}`);
        return res.status(500).json({ error: "Error registering user" });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        return res.status(200);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error });
        }
        return res.status(500).json({
            error: "An unexpected error has occured while trying to log in",
        });
    }
});
