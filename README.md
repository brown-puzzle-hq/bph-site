## Table of Contents

- [Postprodder guide](#postprodder-guide)
  - [First steps](#first-steps)
  - [Adding puzzles](#adding-puzzles)
  - [Creating puzzle and solution bodies](#creating-puzzle-and-solution-bodies)
  - [Creating copy text](#creating-copy-text)
- [Developer guide](#developer-guide)
  - [Overview](#overview)
  - [Quick Links](#quick-links)
  - [Features](#features)
  - [Copying this repository](#copying-this-repository)
  - [Setting up the database](#setting-up-the-database)
  - [Setting up the dev environment](#setting-up-the-dev-environment)
  - [Hunt Structure](#hunt-structure)
  - [Final Checks](#final-checks)
- [Admin guide](#admin-guide)
  - [Navigation](#navigation)
  - [Hinting and Errata](#hinting-and-errata)
  - [Team Management](#team-management)

## Postprodder guide

#### First steps

1. Clone this repository
2. Get the `.env` and put it in the root directory
1. Install [pnpm](https://pnpm.io/)
3. Run `pnpm install` to install the dependencies
6. Create a new branch on GitHub called `your-name-postprodding`

Now you're all ready to start postprodding!

To run the development server and see your changes live:

1. Run `pnpm run dev` in the terminal
2. Go to `http://localhost:3000/`

#### Adding puzzles

1. Add the puzzle to the database

    First, run `pnpm run db:studio` and go to `https://local.drizzle.studio/`. You will see a lot of different tables, but the only one you need to edit is `bph_site_puzzle`.

    ![./docs/drizzle-studio.png](./docs/drizzle-studio.png)

    The `name` column is the title of the puzzle, the `id` column is the slug (URL) for the puzzle, and the `answer` column is the answer to the puzzle in **all caps, no spaces.**

    ```ts
    {
        id: "example",
        name: "Example",
        answer: "ANSWER"
    }
    ```

3. Create a webpage for the puzzle

   Copy the `src/app/(hunt)/puzzle/example` folder to a sibling folder called `src/app/(hunt)/puzzle/your-puzzle-id`.
   Go to `https://localhost:3000/puzzle/your-puzzle-id` to see the new webpage.

    ```
    .
    ├── actions.ts
    ├── components
    │   ├── hint
    │   ├── puzzle
    │   ├── puzzle-list
    │   ├── solution
    │   └── stats
    ├── example
    │   ├── data.tsx
    │   ├── hint
    │   ├── layout.tsx
    │   ├── page.tsx
    │   ├── solution
    │   └── stats
    ├── page.tsx
    └── your-puzzle-id
        ├── data.tsx
        ├── hint
        ├── layout.tsx
        ├── page.tsx
        ├── solution
        └── stats
    ```

4. **Add puzzle information in data.tsx.**

    `data.tsx` contains
    1. Puzzle id (required)
    2. Puzzle body (required) [[advice](#creating-puzzle-bodies)]
    3. Solution body
    4. Copy text [[advice](#creating-copy-text)]
    5. Partial solutions
    6. Extra tasks

    Set values to null or empty if they don't exist.

    ```ts
    export const puzzleId = "example";

    export const inPersonBody = (
        <div className="max-w-3xl text-center">This is the body of the puzzle.</div>
    );

    export const remoteBoxBody = inPersonBody;

    export const remoteBody = (
        <div className="max-w-3xl text-center">This is the body of the remote puzzle.</div>
    );

    export const solutionBody = (
        <div className="max-w-3xl text-center">This is an example solution.</div>
    );

    export const copyText = `1\t2\t3
    4\t5\t6
    7\t8\t9`;

    export const partialSolutions: Record<string, string> = {
        EXAMP: "Almost there!",
        EXAMPL: "Learn to spell!",
    };
    
    export const tasks: Record<string, JSX.Element> = {
        EX: (
            <div className="max-w-3xl text-center">
            This is a task unlocked by submitting EX.
            </div>
        ),
        EXAM: (
            <div className="max-w-3xl text-center">
            This is a task unlocked by submitting EXAM.
            </div>
        ),
    };
    ```

#### Creating puzzle bodies

Puzzle bodies are written in JSX (HTML-in-JavaScript) and Tailwind CSS. There are also some Next.js components that you should use.
Here are some tips:

**General**

1. If the original puzzle is on a **Google Doc**, try exporting it as a Markdown file. Then put that in a Markdown-to-HTML converter like this [one](https://markdowntohtml.com/).

2. AI tools are pretty good at web development. Remember to tell it that you're using Next.js (App Router) with Tailwind CSS.

**Lists, Images, and Videos**

4. For **lists**, use a [Tailwind utility](https://tailwindcss.com/docs/list-style-type). Otherwise, it won't show up. Here, we're using the `list-decimal` utility.

    ```html
    <ul className="list-decimal">
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>
    ```

3. For **images**, use the Next.js `Image` component instead of the `img` tag. Put it somewhere in the puzzle folder and import it like this:

    ```html
    import Image from "next/image";
    import SUDOKU_IMAGE from "./solution/sudoku_image.png";
    <Image src={SUDOKU_IMAGE} width={500} height={500} alt="" />
    ```

    Next.js documentation will tell you to put images in the `public` folder. We don't do that because it makes it harder to leak puzzle information.

4. For **videos**, I recommend uploading it to YouTube as unlisted. YouTube will give you a code embedding that you can copy. You'll have to change some properties to camelCase, so that it looks like this:

    ```html
        <iframe
          className="aspect-video w-full"
          src="https://www.youtube-nocookie.com/embed/XXXXXXXXXXX"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
    ```

    You can also use `iframe` for Google Drive videos. The alternative is to download the video and serve it via an API route, but that gets a bit hairy.

**Appearance**

5. If you want to increase the vertical spacing between elements, use the `mb-4` utility class.

   ```html
    <div>
        <p className="mb-4">Solve this puzzle.</p>
        <Image src="/puzzle/sudoku-51.png" width={500} height={500} alt="" className="mb-4"/>
    </div>
   ```

6. If you need a space between a `p` and a `span`, use `{" "}`.
  
      ```html
      <p>This puzzle is{" "}<span className="underline">difficult</span>.
      ```

7. If you want to **hide** some text, change the background using a `span`.

    ```html
    <p>The answer is{" "}<span className="bg-main-text">ANSWER</span>.
    ```

#### Creating copy text

1. Each copy text entry should either be plaintext (simple and faster) or HTML (which allows for text and cell formatting).

2. With **plaintext**, write a newline to move down a row and `\t` to move across a row. Make sure to wrap the string with backticks (`` ` ``) instead of single or double quotes.

    ```ts
    export const copyText = `one\ttwo
    three\tfour
    =IMAGE("https://www.brownpuzzlehunt.com/home/Register.png")`;
    ```

   With **HTML**, you will have to use raw HTML `style` tags which differ slightly from Tailwind (used for puzzle and solution bodies). You might want to write the HTML elsewhere for syntax highlighting before placing it into the `copyText`.

    ```ts
    export const copyText = `<table>
        <tr>
            <td><b>Bold</b></td>
            <td><i>Italic</i></td>
            <td><u>Underline</u></td>
        </tr>
        <tr>
            <td><span style="color: red;">Red</span></td>
            <td style="background-color: yellow; border: 1px solid red;">Cell</td>
            <td style="background-color: yellow; border-top: 1px solid #452c63;">Cell</td>
        </tr>
        <tr>
            <td>=IMAGE("https://www.brownpuzzlehunt.com/home/Register.png")</td>
        </tr>
    </table>`;
    ```

4. You can make and format table(s) in Google Sheets, export them to HTML, and use that as a starting point.

## Developer guide

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

#### Overview

This project is built using **Next.js v14** using the App Router. The frontend is in the `src/app` folder, and the backend is in the `src/server` folder.

We use Neon **Postgres** as the database and **Drizzle** as the ORM. The schema for the database is in the `src/server/db` folder. It's a good starting point.

Most of the client-to-server communication is currently handled by Vercel **Server Actions**.
Server Actions allow us to execute database queries or API calls inside of a React component without needing to explicitly define an API route.
Note that Server Actions can only be defined in Server Components marked with the `use server` directive.
To make them available in Client Components marked with the `use client` directive, they must be imported or passed as a prop.
Server Actions are generally located in `actions.tsx` files distributed throughout `src/app`.

Authentication, authorization, and session management is handled by **Auth.js**.
We only support username/password authentication using the `Credentials` provider.
Sessions are stored in Json Web Tokens (JWTs) instead of database sessions.
The setup is in the `src/server/auth` folder.

Finally, on the frontend, we are using **Shadcn UI** components with the **Tailwind CSS** framework. Components are in the `src/components/ui` folder.

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

1. Connect the database to the project

  Take a look at `.env.example`. You will need to create a `.env` file at the root of your project and fill in database and the auth fields. If you don't have a preexisting database, the easiest thing to do is to sign up for a Neon Postgres database.

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

3. Go to `http://localhost:3000/` to see the development server.

#### Hunt Structure

Most of the customizable features of the hunt structure is in `hunt.config.ts`.
Edit `/puzzle/actions.ts` to change how it handles guesses and solves.

#### Final Checks

Make sure that `hint.config.ts` is correct.

Before registration starts,

1. Set `REGISTRATION_START_TIME` and `REGISTRATION_END_TIME`
2. Set `HUNT_START_TIME` and `HUNT_END_TIME`

Before the hunt starts,

1. Set `NUMBER_OF_GUESSES_PER_PUZZLE`
6. Set `INITIAL_PUZZLES` and `PUZZLE_UNLOCK_MAP`
7. Set `getTotalHints`

## Admin site guide

#### Navigation

For admins, there is an `admin` section and a `hunt` section with different navbars. You can navigate using the navbar or the command palette (`Cmd-K` or `Ctrl-K`).

#### Hinting and Errata

This can be managed in the `admin` section under `admin/hints` and `admin/errata`.

#### Team Management

Team password resets can be made in `teams/[id]`. Don't change them directly in the Drizzle database. It won't work correctly because passwords need to be hashed.
