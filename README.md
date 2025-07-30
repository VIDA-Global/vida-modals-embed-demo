# Vida Modal Demo

This project shows how to open Vida modals using the official script embed.

## Setup

1. Run `npm install` to get dependencies.
2. Copy `.env.example` to `.env.local` and set these variables:
   - `VIDA_API_TOKEN` – your API token for fetching the temporary auth token.
   - `VIDA_CUSTOMER_EMAIL` – email of the Vida user to authenticate.
3. Start the dev server with `npm run dev` and visit `http://localhost:3000`.

## Using the modal script

The script `https://vida.io/embed/modal/v1/script.js` is loaded globally from `app/layout.js`. It exposes a `vdaModal` object on `window`.

1. The index page requests a one-time auth token from `/api/vida`.
2. Call `window.vdaModal.open(domain, token, params)` to show a modal. Use your reseller domain for `domain` and pass query parameters as the `params` object.
3. Register a handler with `window.vdaModal.onClose` to know when the user closes all modals.

See `app/page.jsx` for a simple example.

## Relevant files
- `app/layout.js` – loads the modal script.
- `app/page.jsx` – opens a modal with the fetched token.
- `app/api/vida/route.js` – proxy to Vida's API for one-time tokens.
- `lib/vida.js` – helper for HTTP requests.
