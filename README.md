# Quiz Tracker

Quiz Tracker is a website where you can test what you know about any topic through fun quizzes. You can use AI to make quizzes from materials you upload. The site helps you see your progress and find what topics you need to work on.

<img width="365" alt="Screenshot 2025-04-26 at 00 18 04" src="https://github.com/user-attachments/assets/30408631-9708-4415-a852-789f0c4f645e" />
<img width="362" alt="Screenshot 2025-04-26 at 00 19 09" src="https://github.com/user-attachments/assets/5bea0f9f-c064-4624-b484-eb21e6a8637a" />
<img width="362" alt="Screenshot 2025-04-26 at 00 19 56" src="https://github.com/user-attachments/assets/0fb86855-1be5-4edb-b764-2fe41c43417a" />
<img width="376" alt="Screenshot 2025-04-26 at 00 20 42" src="https://github.com/user-attachments/assets/e0bae317-44f8-4674-8e4c-621b43a155d6" />
<img width="376" alt="Screenshot 2025-04-26 at 00 21 05" src="https://github.com/user-attachments/assets/02420791-9c5f-4851-b924-6f7106b1cfbe" />


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
