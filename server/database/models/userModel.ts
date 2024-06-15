import mongoose, { Schema, Document, Model } from "mongoose";

interface IUser extends Document {
  username: String;
  email: String;
  password: String;
  salt: String;
  role: String;
  dateAndTimeCreated: Date;
  dateAndTimeLastLoggedIn: Date;
  getUsername(): String;
  getEmail(): String;
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, enum: ["normal", "admin"], default: "normal" },
  dateAndTimeCreated: { type: Date },
  dateAndTimeLastLoggedIn: { type: Date },
});

userSchema.methods.getUsername = function (): String {
  return this.username;
};

userSchema.methods.getEmail = function (): String {
  return this.email;
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
