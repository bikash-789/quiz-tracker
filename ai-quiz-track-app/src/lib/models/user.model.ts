import { Schema, model, Document } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  quizzes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export interface IUser extends Document {
  name: string;
  _id: string;
  email: string;
  password: string;
  quizzes: Schema.Types.ObjectId[];
  isAdmin: boolean;
}

const User = model<IUser>("User", userSchema);
export default User;
