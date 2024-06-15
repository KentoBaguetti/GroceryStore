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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(username, password, salt, email) {
        this.username = username;
        this.password = password;
        this.salt = salt;
        this.email = email;
        this.dateAndTimeUserCreated = new Date();
    }
    setLogInDate() {
        this.dateAndTimeLastLoggedIn = new Date();
    }
}
exports.User = User;
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
