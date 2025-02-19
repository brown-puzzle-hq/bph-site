## Table of Contents

1. [Postprodder guide](#postprodder-guide)
    1. [First steps](#first-steps)
    2. [Adding puzzles](#adding-puzzles)
1. [Developer guide](#developer-guide)
    1. [Overview](#overview)
    3. [Quick Links](#quick-links)
    4. [Features](#features)
    1. [Copying this repository](#copying-this-repository)
    4. [Hunt structure](#hunt-structure)
    5. [Final Checks](#final-checks)
  2. [Admin guide](#admin-guide)
      1. [Navigation](#navigation)
      2. [Hinting and Errata](#hinting-and-errata)
      3. [Team management](#team-management)

## Postprodder guide

This is for the postprodding team. It assumes that there is already a hunt set up.

##### First steps
1. Clone this repository.
2. Get the `.env` and put it in the root directory.
1. Install [pnpm](https://pnpm.io/).
3. Run `pnpm install` to install the dependencies.
4. Run `pnpm run dev` to start the development server.
6. Run `pnpm run db:push` to push the schema in `src/server/db/schema.ts` to the database.
5. Run `pnpm run db:studio` in a separate shell to open Drizzle Studio in your browser.

##### Adding puzzles

1. Get the puzzle name, the slug, and the answer. This is up to the puzzle-writer. The slug must be unique.

    ```
    Puzzle name: "Sudoku #51"
    Slug: "sudoku51"
    Answer: "IMMEDIATE"
    ```

2. Update the puzzle table on Drizzle. The puzzle will not show up on the frontend unless it is in the database.
    
    To get to Drizzle, run `pnpm run db:push` and go to `https://local.drizzle.studio/`. The `name` column is the name, the `id` column is the slug, and the `answer` column is the answer.

    ```
    {
        id: "sudoku51",
        name: "Sudoku #51",
        answer: "IMMEDIATE"
    }
    ```

3. Create a folder in `src/app/(hunt)/puzzle/`. The folder must be named after the puzzle slug. Copy the contents of the `src/app/(hunt)/puzzle/(dev)/example` folder there. The file structure will look something like this:

    ```
    .
    ├── (dev)/
    │   └── example
    │       ├── data.tsx
    │       ├── hint
    │       ├── layout.tsx
    │       ├── page.tsx
    │       └── solution
    ├── actions.tsx
    ├── components/
    ├── page.tsx
    ├── sequences.ts
    └── sudoku51/
        ├── data.tsx
        ├── hint
        ├── layout.tsx
        ├── page.tsx
        └── solution
    ```

4. **Hard-code the puzzle id, the puzzle body, and the solution body inside of data.tsx.** 

    ```
    export const PUZZLE_ID = "sudoku51";

    export const PUZZLE_BODY = (
        <div>
            <p>Here is a sudoku puzzle.</p>
        </div>
    );

    export const SOLUTION_BODY = (
        <div>
            <p>Here is the solution to the sudoku puzzle.</p>
        </div>
    );
    ```

5. **For sequences**, update the `SEQUENCES` in `hunt.config.ts`. Puzzles can be on multiple sequences.

    ```
    export const SEQUENCES = [
      ["sudoku51", "sudoku52"],
      ["sudoku51", "go3", "chess67"]
    ];
    ```

## Developer guide

This assumes that you are setting up a new hunt from scratch.

#### Overview
This project is built using **Next.js v14** using the App Router (not the Pages Router). The frontend is in the `src/app` folder, and the backend is in the `src/server` folder.

We use Vercel **Postgres** as the database and **Drizzle** as the ORM. All of the code for the database is in the `src/server/db` folder.

Most of the client-to-server communication is currently handled by Vercel Server Actions. 
Server Actions allow us to execute database queries or API calls inside of a React component without needing to explicitly define an API route.
Note that Server Actions can only be defined in Server Components marked with the `use server` directive.
To make them available in Client Components marked with the `use client` directive, they must be imported or passed as a prop.
Server Actions are generally located in `actions.tsx` files distributed throughout `src/app`.

Authentication, authorization, and session management is handled by **Auth.js**.
We only support username/password authentication using the `Credentials` provider.
Sessions are stored in Json Web Tokens (JWTs) instead of database sessions.
The setup is in the `src/server/auth` folder.

Finally, on the frontend, we are using **Shadcn UI** components with the **Tailwind CSS** framework. Components are in the `src/components/ui` folder.

#### Quick Links
Make sure to check that you are reading documentation for Next.js with the App Router, not the Pages Router.

Auth.js is formerly known as NextAuth.js. 
Most documentation out there is still for v4, so check that you are reading documentation for v5.

- [Next.js](https://nextjs.org/docs/app) with the App Router
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Drizzle](https://orm.drizzle.team/docs/overview)
- [Auth.js](https://authjs.dev/) v5
- [Vercel Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Tailwind CSS](https://tailwindcss.com/docs/installation)
- [Shadcn](https://ui.shadcn.com/docs)


#### Features
1. In terms of hunt logistics:
    1. Registration opens
    2. Registration closes
    3. When the hunt starts, puzzles drop
    4. When the hunt ends, guesses are frozen

2. Teams can:
    1. Register (`src/app/register`)
    2. Login (`src/app/login`)
    3. Make guesses (`src/app/puzzle/components/GuessForm.tsx`)
    4. See previous guesses (`src/app/puzzle/components/PreviousGuessTable.tsx`)
    5. Request hints (`src/app/puzzle/components/HintForm.tsx`)
    6. See previous hints (`src/app/puzzle/components/PreviousHintTable.tsx`)
    7. See the leaderboard (`src/app/leaderboard`)

3. Admins can:
    1. See all teams (`src/app/admin/teams`)
    2. See all guesses (`src/app/admin/guesses`)
    3. See all requests for hints (`src/app/admin/hints`)
    4. Give teams hints (`src/app/admin/hints`)

#### Copying this repository
I recommend duplicating this repository for each hunt. If you probably want to get updates from the original repository, you can follow these steps:

1. Create a bare clone of this repository.
    ```
    git clone --bare https://github.com/brown-puzzle-hq/bph-site.git
    ```
2. Create a new repository on GitHub. You will get an URL for this repository.

3. Mirror-push to the new repository.
    ```
    cd bph-site.git
    git push --mirror https://github.com/YOUR_USERNAME/NEW_REPOSITORY.git
    ```
4. Remove the temporary repository.
    ```
    cd ..
    rm -rf bph-site.git
    ```
5. Clone the new repository to your local machine.
    ```
    git clone https://github.com/YOUR_USERNAME/NEW_REPOSITORY.git
    ```

6. Add the original repository as a remote branch `public`.
    ```
    git remote add public https://github.com/brown-puzzle-hq/bph-site.git
    ```

7. To get changes from the original repository, run
    ```
    git fetch public
    ```

8. To merge changes from the original repository, run
    ```
    git merge public/main
    ```

There is more information on the [GitHub docs](https://docs.github.com/en/repositories/creating-and-managing-repositories/duplicating-a-repository).

#### Setting up the database

1. Take a look at `.env.example`. You will need to fill in the `DATABASE_URL` and `DRIZZLE_URL` fields. If you don't have a preexisting database, the easiest thing to do is to sign up for a Neon Postgres database.

2. Push the schema to the database. This only needs to be done when you update the schema in `src/server/db/schema.ts`.
    ```
    pnpm run db:push
    ```

3. Run Drizzle studio to look at the database.
    ```
    pnpm run db:studio
    ```

#### Setting up the dev environment

1. Download all of the dependencies. This only needs to be done when you update the dependencies in `package.json`.
    ```
    pnpm install
    ```

2. Start the development server.
    ```
    pnpm run dev
    ```

#### Hunt Structure

All of the customizable features of the hunt structure is in `hunt.config.ts`. To change how puzzles are unlocked, edit `getNextPuzzleMap` in `hunt.config.ts`. To change how many hints a team gets, edit `getTotalHints`.

#### Final Checks

Make sure that `hint.config.ts` is correct. 

Before registration starts,
1. Set `REGISTRATION_START_TIME` and `REGISTRATION_END_TIME`
2. Set `HUNT_START_TIME` and `HUNT_END_TIME`

Before the hunt starts,
1. Set `NUMBER_OF_GUESSES_PER_PUZZLE`
6. Set `INITIAL_PUZZLES`, `getNextPuzzleMap`, and `checkFinishHunt`
7. Set `getTotalHints`
4. Remove the development puzzles in `src/app/(hunt)/puzzle/(dev)/`.

## Admin guide

This assumes that you are an admin for the hunt and will not need to make any changes to the code.

#### Navigation
For admins, there is an `admin` section and a `hunt` section with different navbars. You can navigate using the navbar or the command palette (`Cmd-K` or `Ctrl-K`). This works reliably on Chrome, but you might need to refresh on Safari or other browsers. 

#### Hinting and Errata
This can be managed in the `admin` section under `admin/hints` and `admin/errata`.

#### Team Management
Team password resets can be made in `teams/[id]`. Please don't change them directly in the Drizzle database. It won't work correctly because passwords need to be hashed.
