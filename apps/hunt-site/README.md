This is a fully functional and customizable puzzlehunt site built with Next.js, TypeScript, and Tailwind CSS. It has been used in [Puzzlethon 2024](https://puzzlethon.brownpuzzle.club/) and [BPH 2025](https://www.brownpuzzlehunt.com/).

The docs are available [here](https://example.brownpuzzlehunt.com/docs).

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
5. Puzzle copy text, solutions, and statistics
6. Feedback system
7. Info and wrapup pages

On the admin side:

1. Team account management
2. Hint claiming and response
3. Errata system
4. Integration with Discord and email notifications

On the development side:

1. Customizable hunt structure
2. Customizable hunt-end conditions
3. Flexible puzzle template for static or interactive puzzles
4. Support for both in-person and remote interaction modes

## Quick Start

1. Set up the environment variables in `.env` (see `.env.example` below). If you don't have a preexisting database, the easiest way to get started is to use the Neon Postgres database.

```example file=.env.example
# This file will be committed to version control, so make sure not to have any
# secrets in it. If you are cloning this repo, create a copy of this file named
# ".env" and populate it with your secrets.

# When adding additional *required* environment variables, the schema in "/src/env.js"
# should be updated accordingly.

# Next Auth (required)
# You can generate a new secret on the command line with:
# openssl rand -base64 32
# https://next-auth.js.org/configuration/options#secret
AUTH_SECRET=""
AUTH_URL="http://localhost:3000" # Remember to change this for production
AUTH_DRIZZLE_URL=postgres://postgres:postgres@127.0.0.1:5432/db

# Database (required)
DATABASE_URL=""
POSTGRES_DATABASE=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_PRISMA_URL=""
POSTGRES_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_URL_NO_SSL=""
POSTGRES_USER=""

# Communication (optional)
# https://support.discord.com/hc/en-us/articles/228383668-Intro-to-Webhooks
# Remember to configure role IDs in "src/lib/comms.ts" if using mentions
DISCORD_WEBHOOK_URL=""
DISCORD_WEBHOOK_URL_HINT=""
DISCORD_WEBHOOK_URL_GUESS=""
DISCORD_WEBHOOK_URL_FINISH=""
DISCORD_WEBHOOK_URL_FEEDBACK=""
DISCORD_WEBHOOK_URL_TEAM=""
DISCORD_WEBHOOK_URL_DEV=""

# https://resend.com/api-keys
RESEND_API_KEY=""

# Websocket
# Needs to be NEXT_PUBLIC_ so that it is exposed to the client
NEXT_PUBLIC_WEBSOCKET_SERVER="localhost:1030"
# Use "ws:" for development and "wss:" for production
NEXT_PUBLIC_WEBSOCKET_PROTOCOL="ws:"
# Use "http:" for development and "https:" for production
BROADCAST_PROTOCOL="http:"
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
