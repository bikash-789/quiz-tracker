export default function Home() {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] items-center justify-items-center min-h-screen pb-20 sm:p-8 font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="w-full row-start-1 flex justify-between items-center py-4 border-b my-1">
        <div className="text-2xl font-bold gradient-text gradient-text-hover">
          AIQuizTrack
        </div>

        <nav className="flex gap-4">
          <a href="#features" className="hover:opacity-80">
            Features
          </a>
          <a href="#quizzes" className="hover:opacity-80">
            Quizzes
          </a>
          <a href="#about" className="hover:opacity-80">
            About
          </a>
          <a href="#contact" className="hover:opacity-80">
            Contact
          </a>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-4xl">
        <section className="text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold">
            Track your progress with AI-powered quizzes!
          </h1>
          <p className="mt-4 text-lg">
            Welcome to AIQuizTrack, a powerful tool that helps you track your
            learning progress with personalized quizzes, AI-generated questions,
            and insightful feedback. Start enhancing your knowledge today!
          </p>
          <div className="mt-6">
            <button className="border-2 px-6 py-3 uppercase border-black text-black bg-white hover:bg-black hover:text-white transition-colors duration-300 ease-in-out">
              Get Started
            </button>
          </div>
        </section>

        <section id="features" className="w-full mt-16">
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

      {/* Footer */}
      <footer className="row-start-3 w-full flex flex-col gap-4 items-center justify-center p-4 border-t">
        <div className="flex gap-6">
          <a href="#privacy" className="hover:opacity-80">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:opacity-80">
            Terms of Service
          </a>
        </div>
        <p className="text-sm">&copy; 2024 AIQuizTrack. All rights reserved.</p>
      </footer>
    </div>
  );
}
