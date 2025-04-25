# Quiz Tracker

Quiz Tracker is a website where you can test what you know about any topic through fun quizzes. You can use AI to make quizzes from materials you upload. The site helps you see your progress and find what topics you need to work on.

## What You Can Do

- **Take Fun Quizzes**: Try quizzes on many topics - school subjects, work skills, or hobbies.
- **See Your Progress**: Check how well you're doing and find what you need to improve.
- **Get Quick Feedback**: Learn right away if your answers are right, with clear explanations.
- **Use Any Device**: The site works well on computers, tablets, and phones.
- **View Learning Stats**: See charts and graphs that show how you're learning and what to study next.
- **Earn Rewards**: Get badges and certificates as you improve, to keep you motivated.

## What We Use to Build It

- **Main Framework**: Next.js 14, React, TypeScript
- **Design Parts**: Shadcn UI, Radix UI
- **Look and Style**: Tailwind CSS
- **Data Management**: React Hooks, Context API
- **URL Handling**: nuqs

## How to Start

### What You Need First

- Node.js 18.17.1 or newer
- npm or yarn

### Setup Steps

1. Get the code:
   ```bash
   git clone https://github.com/bikash-789/quiz-tracker.git
   cd quiz-tracker
   ```

2. Install what you need:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the website on your computer:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser to see the site.

## How Files Are Organized

```
quiz-tracker/
├── src/
│   ├── app/
│   │   ├── (dashboard)/        # Dashboard pages
│   │   ├── auth/               # Login pages
│   │   ├── api/                # Data connections
│   │   ├── globals.css         # Main styles
│   │   └── layout.tsx          # Main layout
│   ├── components/
│   │   ├── ui/                 # Basic design parts
│   │   ├── auth/               # Login parts
│   │   ├── dashboard/          # Dashboard parts
│   │   └── quiz/               # Quiz parts
│   └── lib/
│       ├── constants/          # Fixed data
│       ├── types/              # Data types
│       └── utils.ts            # Helper functions
└── public/                     # Images and files
```
