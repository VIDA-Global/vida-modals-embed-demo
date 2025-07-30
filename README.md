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

1. The index page requests a one-time auth token from `/api/vida`. This part of the project should happen server-side when implemented. You will use your reseller API token to fetch a one time token for a user of an organization given their email address. You can get your reseller API token from the settings tab of your Vida reseller dashboard.
2. Define the domain for your modal. Use your reseller domain for `domain` and pass query parameters as the `params` object. By default, the doamin can be vida.io, but if you want to customize the url loaded in the modal's iframe, you can use your custom reseller domain which can be found in the settings tab of your Vida reseller dashboard.
3. Define the params for your modal. Params simulate the query strings used to load specific modals inside the Vida app. You can find the required parameters for a given modal by viewing the query string parameters used by the Vida app when opening a modal.
4. Call `window.vdaModal.open(domain, token, params)` to show a modal. 
5. Register a handler with `window.vdaModal.onClose` to know when the user closes all modals.

See `app/page.jsx` for simple examples.

## Relevant files
- `app/layout.js` – loads the modal script.
- `app/page.jsx` – opens a modal with the fetched token.
- `app/api/vida/route.js` – proxy to Vida's API for one-time tokens.
- `lib/vida.js` – helper for HTTP requests.
