bph-site is a fully functional and customizable puzzlehunt site built with Next.js, TypeScript, and Tailwind CSS. It has been used in [Puzzlethon 2024](https://puzzlethon.brownpuzzle.club/) and [BPH 2025](https://www.brownpuzzlehunt.com/).

The docs are available [here](https://bph-site.vercel.app/docs).

## Features

On the hunt side:

1. Team registration and authentication
2. Real-time leaderboard
3. Guessing system with support for:
   1. Guess limits
   2. Answer verification
   3. Partial solutions
   4. Follow-up tasks
4. Hint-request system with hint limits and follow-up replies
4. Puzzle copy text, solutions, and statistics
5. Feedback system
6. Info and wrapup pages

On the admin side:

1. Team account management
2. Hint claiming and response
2. Errata system
4. Integration with Discord and email notifications

On the development side:

1. Customizable hunt structure
2. Customizable hunt-end conditions
3. Flexible puzzle template for static or interactive puzzles
4. Support for both in-person and remote interaction modes

## Quick Start

1. Set up the environment variables in `.env` (see `.env.example` below). If you don't have a preexisting database, the easiest way to get started is to use the Neon Postgres database.

  ```
  {{{ env_example }}}
  ```

2. Push the schema to the database. You need to do this every time the schema in `src/server/db/schema.ts` changes.

  ```
  pnpm run db:push
  ```

  You can look at the current state of the database by visiting Drizzle Studio.

  ```
   pnpm run db:studio
  ```

3. Download all dependencies. You need to do this every time the dependencies in `package.json` changes.

  ```
  pnpm install
  ```

4. Start the development server.

  ```
  pnpm run dev
  ```

  After a second, you'll see this text appear in the terminal:

  ```
  ▲ Next.js 14.2.15
  - Local:        http://localhost:3000
  - Environments: .env
  ```
  
  Navigate to [http://localhost:3000/](http://localhost:3000/) to see the development server.
