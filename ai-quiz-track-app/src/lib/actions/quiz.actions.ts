"use server";

import { Schema } from "mongoose";
import Quiz from "../models/quiz.model";
import User from "../models/user.model";
import { connectToDB } from "../../config/mongoose";

// CREATE method
export async function createQuiz(
  id: string,
  title: string,
  description: string,
  createdById: string
) {
  try {
    connectToDB();

    const user = await User.findOne({ _id: createdById });

    if (!user) {
      throw new Error("User not found");
    }

    const newQuiz = new Quiz({
      id,
      title,
      description,
      createdBy: user._id,
    });

    const createdQuiz = await newQuiz.save();

    user.quizzes.push(createdQuiz._id as Schema.Types.ObjectId);
    await user.save();

    return createdQuiz;
  } catch (error) {
    console.error("Error creating quiz:", error);
    throw error;
  }
}

// GET method
export async function fetchQuizDetails(id: string) {
  try {
    connectToDB();

    const quizDetails = await Quiz.findOne({ _id: id }).populate("createdBy");

    if (!quizDetails) {
      throw new Error("Quiz not found");
    }

    return quizDetails;
  } catch (error) {
    console.error("Error fetching quiz details:", error);
    throw error;
  }
}

// PUT method
export async function updateQuiz(
  id: string,
  title?: string,
  description?: string
) {
  try {
    connectToDB();

    const updatedQuiz = await Quiz.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true }
    );

    if (!updatedQuiz) {
      throw new Error("Quiz not found");
    }

    return updatedQuiz;
  } catch (error) {
    console.error("Error updating quiz:", error);
    throw error;
  }
}

// DELTE method
export async function deleteQuiz(id: string) {
  try {
    connectToDB();

    const deletedQuiz = await Quiz.findOneAndDelete({ _id: id });

    if (!deletedQuiz) {
      throw new Error("Quiz not found");
    }

    const user = await User.findOne({ quizzes: deletedQuiz._id });

    if (user) {
      user.quizzes = user.quizzes.filter((quizId) => quizId.toString() !== id);
      await user.save();
    }

    return deletedQuiz;
  } catch (error) {
    console.error("Error deleting quiz:", error);
    throw error;
  }
}
