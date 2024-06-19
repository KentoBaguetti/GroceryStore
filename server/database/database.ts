import mongoose from "mongoose";
import dotenv from "dotenv";
import { register, login } from "./auth/auth";
import authMiddleware from "./auth/authMiddleware";
import { validateRegistration } from "./auth/validationMiddleware";
import express from "express";

dotenv.config();

const uri =
  process.env.MONGO_URI || "mongodb://localhost:27017/GroceryStoreDatabase";

async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions);
    console.log("Connected to the Database");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to the database: ${error.message}`);
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
}

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(express.json());

// connectToDB();

// app.post("/register", validateRegistration, register);
// app.post("/login", login);

// // Example of a protected route
// app.get("/protected", authMiddleware, (req, res) => {
//   res.send("This is a protected route.");
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

export default connectToDB;