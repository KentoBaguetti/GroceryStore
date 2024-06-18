import User from "../models/userModel";
import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import express, { type Request, type Response } from "express";
import { usernameExists, emailExists } from "./authHelper";

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

  try {
    return res.status(200);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ error });
    }
    return res.status(500).json({
      error: "An unexpected error has occured while trying to log in",
    });
  }
};

export { register };
