import User from "../models/userModel";
import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import express, { type Request, type Response } from "express";
import { usernameExists, emailExists, updateLoginTime } from "./authHelper";
import dotenv from "dotenv";
dotenv.config();
import type { CustomRequest } from "./authMiddleware";

const register = async (req: Request, res: Response): Promise<Response> => {
  const {
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ error: "More user information is required for registration" });
  }

  try {
    const existingUsername: boolean = await usernameExists(username);
    const existingEmail: boolean = await emailExists(email);

    if (existingUsername) {
      return res.status(400).json({ error: "Username is already taken!" });
    }

    if (existingEmail) {
      return res.status(400).json({ error: "Email is already taken!" });
    }

    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      salt,
      role: "normal",
      dateAndTimeCreated: new Date(),
      dateAndTimeLastLoggedIn: null,
    });

    await newUser.save();

    return res.status(200).json({ message: "User successfully created!" });
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  } catch (error: any) {
    console.log(`Error registering a user: ${error.message}`);
    return res.status(500).json({ error: "Error registering user" });
  }
};

const login = async (req: Request, res: Response): Promise<Response> => {
  const { username, password }: { username: string; password: string } =
    req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );

    await updateLoginTime(username);

    res.cookie(
      "userCookie",
      { token: `Bearer ${token}` },
      {
        maxAge: 3600000,
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      }
    );

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error: error.message });
    }
    return res
      .status(500)
      .json({ error: "An unexpected error occurred while trying to log in" });
  }
};

const updateUserRole = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { username, newRole }: { username: string; newRole: string } = req.body;

  if (!username || !newRole) {
    return res
      .status(422)
      .json({ error: "Please enter a valid username and role" });
  }

  try {
    await User.findOneAndUpdate({ username }, { role: newRole });

    return res.status(200).json({ message: "Successfully updated user role" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({ error: `Error message: ${error.message}` });
    }

    return res
      .status(400)
      .json({ error: "Updating user ran into an unexpected error" });
  }
};

// Once this function is used by the user, the user should be logged out and need to log in again
// creating a new jwt token and destroying the previous one
const updateUserData = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  const {
    newUsername,
    newEmail,
    newPassword,
  }: {
    newUsername?: string;
    newEmail?: string;
    newPassword?: string;
  } = req.body;

  const { username } = req.user;

  const updateFields: { [key: string]: string } = {};
  if (newUsername) {
    if (await User.findOne({ username: newUsername })) {
      return res
        .status(300)
        .json({ error: "Someone is already using this username" });
    }
    updateFields.username = newUsername;
  }
  if (newEmail) {
    if (await User.findOne({ email: newEmail })) {
      return res
        .status(300)
        .json({ error: "This email is already being used by someone else" });
    }
    updateFields.email = newEmail;
  }
  if (newPassword) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    updateFields.pasword = hashedPassword;
    updateFields.salt = salt;
  }

  try {
    await User.findOneAndUpdate({ username }, { $set: updateFields });
    return res.status(200).json({ message: "User data updated successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res
        .status(500)
        .json({ error: `Error updating user data: ${error.message}` });
    }
    return res
      .status(500)
      .json({ error: "Ran into an unexpected error while updating user data" });
  }
};

export { register, login, updateUserRole, updateUserData };
