# Volcano Trivia App

Welcome to the Volcano Trivia App! Are you smart enough to be a volcanologist? Test your knowledge with our engaging trivia questions and see how you stack up against the experts. If you're not careful, you might trigger a volcanic eruption!

## Table of Contents

- [Introduction](#volcano-trivia-app)
- [Features](#features)
- [Pages](#pages)
- [Technologies](#technologies)
- [Data Model](#data-model)
- [Getting Started](#getting-started)
- [Future Plans](#future-plans)
- [Contributing](#contributing-section)

## Features

- Log in to start the quiz.
- Answer 5 randomly selected questions ranging from easy to hard.
- View results to see how well you performed.
- Explore high scores to challenge others.

## Pages

1. **Start Page**
   - Users log in here to start the quiz.

2. **Question Page**
   - Users face a series of 5 random questions, testing their volcano knowledge.

3. **Results Page**
   - Displays the results of the quiz, highlighting correct and incorrect answers.

4. **Users Page**
   - Explore high scores and challenge others.

## Technologies

- **Vue.js:** Frontend framework for building interactive user interfaces.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **Supabase:** Backend platform for handling user authentication and storing quiz data.

## Data Model

### Answer Array

```json
[
  {
    "question_foreign_key": "uuid",
    "id": "uuid",
    "created_at": "timestamp",
    "answers": ["answer1", "answer2", "answer3", "answer4"],
    "correct_answer": "text"
  }
]
```

### High Score

```json
[
  {
    "id": "uuid",
    "user_name": "text",
    "score": 5
  }
]
```

### Profile

```json
[
  {
    "id": "int8",
    "score": [
      {
        "correct": 3,
        "incorrect": 2
      }
    ],
    "userId": "uuid",
    "display_name": "text"
  }
]
```

### Question

```json
[
  {
    "id": "uuid",
    "question": "text",
    "created_at": "timestamp"
  }
]
```

### Getting Started

1 Clone the repository.

```bash
git clone https://github.com/Iconians/volcanoTriviaApp.git
```

2 Install dependencies.

```bash
npm i
```

3 Set up Supabase credentials.

4 Run the application.

```bash
npm run dev
```

Visit [http://localhost:8080](http://localhost:8080) in your browser.

[live site](https://volcano-trivia-app.vercel.app/)

Future Plans
Expand the question pool to provide more variety.
Enhance user profiles and add additional features.
Implement real-time multiplayer mode.
Contributing
Contributions are welcome! If you have ideas for improvement, feel free to submit a pull request.
