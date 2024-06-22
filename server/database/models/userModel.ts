import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  salt: string;
  role: string;
  dateAndTimeCreated: Date;
  dateAndTimeLastLoggedIn: Date | null;
  tokens: string[];
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  role: { type: String, default: "normal" },
  dateAndTimeCreated: {
    type: Date,
    enum: ["normal", "admin"],
    default: Date.now,
  },
  dateAndTimeLastLoggedIn: { type: Date, default: null },
  tokens: [{ type: String }],
});

// Add instance methods to the schema
UserSchema.methods.getUsername = function (): string {
  return this.username;
};

UserSchema.methods.getEmail = function (): string {
  return this.email;
};

// Export the model with the schema
export const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
