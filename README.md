## README

The Brown Puzzlehunt monorepo has two applications:

- `app/bph-site`: a Next.js application that contains the main hunt logic
- `app/ws-server`: an express server that handles WebSocket connections

The monorepo is managed with **turborepo**. It is recommended to install it globally.

```bash
pnpm add turbo --global
```

**Getting started**

1. Run `pnpm i` in the root directory to install all dependencies across the workspace
2. Then run `turbo dev` to start both `bph-site` and `ws-server`

## bph-site

`bph-site` is the primary web application and can be run as a standalone hunt site (without websockets). See the [README](/apps/bph-site/README.md) for details.

## ws-server

Since `bph-site` is hosted serverlessly on Vercel (which does not support websocket connections), a separate server is required for handling websockets. This is the purpose of `ws-server`.

**Migration**

To transition an existing `bph-site` application to use websockets, do the following:

1. Clone this repository and replace `apps/bph-site` with your `bph-site` application
2. In the Vercel deployment, set the root directory to `apps/bph-site`
3. Deploy `apps/ws-server` in Fly.io

Notes:

- This repo is primarily set up for `pnpm`. If you prefer to use `npm`, make sure to declare the workspaces in `package.json` like so:

  ```json
  {
    "workspaces": ["apps/*"]
  }
  ```

- Environment variables and `package.json` commands (such as `build` or `db:push`) need to be specified in `turbo.json`
