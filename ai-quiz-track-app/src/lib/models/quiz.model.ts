import { Schema, model, Document } from "mongoose";

const quizSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  questions: [
    {
      questionText: { type: String, required: true },
      options: [
        {
          optionText: { type: String, required: true },
          isCorrect: { type: Boolean, required: true },
        },
      ],
      explanation: { type: String, required: false },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export interface IQuiz extends Document {
  title: string;
  description: string;
  questions: Array<{
    questionText: string;
    options: Array<{
      optionText: string;
      isCorrect: boolean;
    }>;
    explanation?: string;
  }>;
  createdBy: Schema.Types.ObjectId;
}

const Quiz = model<IQuiz>("Quiz", quizSchema);
export default Quiz;
