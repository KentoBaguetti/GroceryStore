import User from "../models/userModel";
import mongoose from "mongoose";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
import { validateUsername, validateEmail } from "./authHelper";

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
    const validUsername: boolean = await validateUsername(username);
    const validEmail: boolean = await validateEmail(email);

    if (!validUsername) {
      return res.status(400).json({ error: "Username is already taken!" });
    }

    if (!validEmail) {
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
  } catch (error: any) {
    console.log(`Error registering a user: ${error.message}`);
    return res.status(500).json({ error: "Error registering user" });
  }
};

export { register };
