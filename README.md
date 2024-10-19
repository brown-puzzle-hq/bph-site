# TODO

- [x] Deploy to Vercel
- [x] Add Vercel Postgres
- [x] Add NextAuth with Discord
- [x] Attach database to UI
- [x] Create basic schema for puzzles and teams
- [x] Add leaderboard page
- [x] Add simple puzzle page
    - [x] Add client guess submission 
    - [x] Add server side validation
    - [x] Display previous guesses
    - [ ] Automatically sanitize the guess (ONLY ALPHABETIC CAPS)
    - [ ] Don't double jeapordize the team for the same guess

- [x] Handle authentication
- [x] Handle session management
- [x] Add login page
- [x] Add registration page

- [ ] Add admin dashboard
- [ ] Add hinting system
    - [ ] Add hint request form
    - [ ] Add hint response form
    - [ ] Handle authorization

- [ ] Display list of puzzles dynamically
- [ ] Add errata system
- [ ] Index the database
- [ ] Test-solving

# Notes

Check out https://github.com/TheEdoRan/next-safe-action

## API Routes vs Websockets

API routes follow a request-response model. The client sends a request (GET, POST, PUT) to the server, and the server responds with data. This is a synchronous communication because the client makes a request, waits for a response, and closes the connection.

Websockets allow for persistent, bidirectional communication between the client and server. This is asynchronous communication because the client can send messages to the server at any time, and the server can send messages to the client at any time. The server can send real-time updates to the client without the client having to make a request. This is useful for real-time applications like chat apps, multiplayer games, and collaborative tools.

## Server Components vs Client Components
Server components handle static data fetching and rendering. For example, the leaderboard page is a server component. Client components handle user interactions such as form submissions and client-side events. For example, the guess form is a client component. Note that these can be combined together. 

## tRPC
tRPC allows you to build typesafe APIs. 

1. Define routers in the `server/api/routers/` folder. Routers contain multiple procedures. They can be queries, mutations, or subscriptions. 
2. Merge these routers in `server/api/root.ts` into a centralized `appRouter`. 
3. Call procedures in the frontend using the `useRouter` hook.
