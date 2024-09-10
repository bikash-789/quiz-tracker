"use server";

import User from "../models/user.model";
import { connectToDB } from "../../config/mongoose";

// CREATE method
export async function createUser(
  id: string,
  name: string,
  username: string,
  email: string,
  password: string
) {
  try {
    connectToDB();

    const newUser = new User({
      id,
      name,
      username,
      email,
      password,
    });

    const createdUser = await newUser.save();
    return createdUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

// GET method
export async function fetchUserDetails(id: string) {
  try {
    connectToDB();

    const userDetails = await User.findOne({ id });

    if (!userDetails) {
      throw new Error("User not found");
    }

    return userDetails;
  } catch (error) {
    console.error("Error fetching user details:", error);
    throw error;
  }
}

// PUT method
export async function updateUser(
  id: string,
  name?: string,
  username?: string,
  email?: string,
  password?: string
) {
  try {
    connectToDB();

    const updatedUser = await User.findOneAndUpdate(
      { id },
      { name, username, email, password },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}

// DELTE method
export async function deleteUser(id: string) {
  try {
    connectToDB();

    const deletedUser = await User.findOneAndDelete({ id });

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
}
