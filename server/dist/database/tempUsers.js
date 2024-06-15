"use strict";
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
const registerUser = (req, res) => { };
