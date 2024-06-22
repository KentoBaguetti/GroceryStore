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
exports.logout = exports.updateUserData = exports.updateUserRole = exports.login = exports.register = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authHelper_1 = require("./authHelper");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
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
    if (!username || !password) {
        return res
            .status(400)
            .json({ error: "Username and password are required" });
    }
    try {
        const user = yield userModel_1.default.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Invalid username or password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id, username: user.username, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        yield (0, authHelper_1.updateLoginTime)(username);
        res.cookie("userCookie", { token: `Bearer ${token}` }, {
            maxAge: 3600000,
            httpOnly: true,
            secure: true,
            sameSite: "strict",
        });
        return res.status(200).json({ message: "Login successful" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        return res
            .status(500)
            .json({ error: "An unexpected error occurred while trying to log in" });
    }
});
exports.login = login;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, newRole } = req.body;
    if (!username || !newRole) {
        return res
            .status(422)
            .json({ error: "Please enter a valid username and role" });
    }
    try {
        yield userModel_1.default.findOneAndUpdate({ username }, { role: newRole });
        return res.status(200).json({ message: "Successfully updated user role" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ error: `Error message: ${error.message}` });
        }
        return res
            .status(400)
            .json({ error: "Updating user ran into an unexpected error" });
    }
});
exports.updateUserRole = updateUserRole;
// Once this function is used by the user, the user should be logged out and need to log in again
// creating a new jwt token and destroying the previous one
const updateUserData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newUsername, newEmail, newPassword, } = req.body;
    const { username } = req.user;
    const updateFields = {};
    if (newUsername) {
        if (yield userModel_1.default.findOne({ username: newUsername })) {
            return res
                .status(300)
                .json({ error: "Someone is already using this username" });
        }
        updateFields.username = newUsername;
    }
    if (newEmail) {
        if (yield userModel_1.default.findOne({ email: newEmail })) {
            return res
                .status(300)
                .json({ error: "This email is already being used by someone else" });
        }
        updateFields.email = newEmail;
    }
    if (newPassword) {
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(newPassword, salt);
        updateFields.pasword = hashedPassword;
        updateFields.salt = salt;
    }
    try {
        yield userModel_1.default.findOneAndUpdate({ username }, { $set: updateFields });
        return res.status(200).json({ message: "User data updated successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: `Error updating user data: ${error.message}` });
        }
        return res
            .status(500)
            .json({ error: "Ran into an unexpected error while updating user data" });
    }
});
exports.updateUserData = updateUserData;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie("userCookie");
        return res.status(200).json({ message: "Logged out successfully" });
    }
    catch (error) {
        if (error instanceof Error) {
            return res
                .status(500)
                .json({ error: `Expected error: ${error.message}` });
        }
        return res.status(500).json({ error: "Ran into an unexpected error" });
    }
});
exports.logout = logout;
