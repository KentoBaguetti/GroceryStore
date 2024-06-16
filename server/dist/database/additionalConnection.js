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
const uri = "mongodb://localhost:27017/GroceryStoreDatabase";
const createAdditionalConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const connection = mongoose_1.default.createConnection(uri);
    connection.on("connected", () => {
        console.log("Connected to the Database (additional connection)");
    });
    connection.on("error", (error) => {
        console.error(`Error connecting to the database: ${error.message}`);
    });
    return connection;
});
exports.default = createAdditionalConnection;
