import mongoose from "mongoose";

const uri = "mongodb://localhost:27017/GroceryStoreDatabase";

async function connectToDB(): Promise<void> {
  try {
    await mongoose.connect(uri);
    console.log("Connected to the Database");
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Error connecting to the database: ${error.message}`);
    } else {
      console.log(`Unexpected error: ${error}`);
    }
  }
}

export default connectToDB;
