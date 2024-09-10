"use server";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/user.model";
import { connectToDB } from "../../config/mongoose";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

function generateToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "1h" });
}

// SIGNUP
export async function registerUser(
  id: string,
  name: string,
  email: string,
  password: string
) {
  try {
    connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      id,
      name,
      email,
      password: hashedPassword,
    });

    const createdUser: IUser = await newUser.save();

    return {
      user: createdUser,
      token: generateToken(createdUser._id.toString()),
    };
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// LOGIN
export async function loginUser(email: string, password: string) {
  try {
    connectToDB();

    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user._id.toString());

    return {
      user,
      token,
    };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}
