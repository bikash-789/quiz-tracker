import React from "react";
import Button from "@/components/Buttons";

const Home: React.FC = () => {
  return (
    <div className="dark:bg-gray-900 h-full w-full flex flex-col gap-8 items-center justify-center">
      {/* Main content */}
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-4xl">
        <section className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold px-3 sm:px-0 py-1">
            Track your progress with AI-powered quizzes!
          </h1>
          <p className="mt-4 text-lg px-3 sm:px-0">
            Welcome to AIQuizTrack, a powerful tool that helps you track your
            learning progress with personalized quizzes, AI-generated questions,
            and insightful feedback. Start enhancing your knowledge today!
          </p>
          <Button type="primary" className="mt-6">
            Get Started
          </Button>
        </section>

        <section id="features" className="w-full mt-16 px-8 sm:px-0 pb-6">
          <h2 className="text-3xl font-semibold">Features</h2>
          <ul className="mt-4 grid gap-6 sm:grid-cols-2">
            <li className="p-4 border">
              <h3 className="text-xl font-bold">AI Quiz Generation</h3>
              <p className="mt-2">
                Automatically generate quizzes with AI technology to assess your
                knowledge.
              </p>
            </li>
            <li className="p-4 border">
              <h3 className="text-xl font-bold">Progress Tracking</h3>
              <p className="mt-2">
                Track your learning progress with detailed analytics and
                performance metrics.
              </p>
            </li>
            <li className="p-4 border">
              <h3 className="text-xl font-bold">Customizable Quizzes</h3>
              <p className="mt-2">
                Create custom quizzes to focus on your weak areas and improve
                faster.
              </p>
            </li>
            <li className="p-4 border">
              <h3 className="text-xl font-bold">Reminders & Scheduling</h3>
              <p className="mt-2">
                Set quiz reminders and schedule tests to stay on top of your
                learning goals.
              </p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default Home;
