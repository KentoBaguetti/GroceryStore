import mongoose from "mongoose";

const uri = "mongodb://localhost:27018/Database";

const createAdditionalConnection = async (): Promise<mongoose.Connection> => {
  const connection = mongoose.createConnection(uri);

  connection.on("connected", () => {
    console.log("Connected to the Database (additional connection)");
  });

  connection.on("error", (error: Error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });

  return connection;
};

export default createAdditionalConnection;
