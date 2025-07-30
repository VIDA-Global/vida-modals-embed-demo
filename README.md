---
title: "Embedding VIDA App Modals"
description: "Guide for resellers to open parts of the VIDA app in a modal using /embed/modal/v1/script.js."
---

Resellers can open specific areas of the VIDA app inside a popup modal. Include the script below on any page where you want to trigger a modal.

```html
<script src="https://vida.io/embed/modal/v1/script.js" defer></script>
```

## Opening a Modal

Use the global `vdaModal.open()` method after the script loads. This method accepts three arguments:

1. `domain` – base URL for the VIDA instance, e.g. `"vida.io"`.
2. `authToken` – one‑time token for auto-login.
3. `params` – object with query parameters (such as `org`, `agent`, `signup`).

```javascript
vdaModal.open("vida.io", "YOUR_TOKEN", {
  org: "orgId123",
  agent: "agentId456",
  signup: true,
});
```

The modal automatically creates an iframe pointing to `/embed/modal` with the provided parameters. Close the modal programmatically by listening to the `onClose` callback:

```javascript
vdaModal.onClose(() => {
  console.log("modal closed");
});
```

## Required Parameters

- `authToken` – one‑time authentication token used to log the user in. [See how to generate a token](https://vida.io/docs/api-reference/authorization/generate-one-time-auth-token).
- `domain` – the VIDA domain hosting the embed. Defaults to `vida.io`.

## Optional Parameters

- `org` – load a specific organization.
- `agent` – load a specific agent.
- `signup` – redirect unauthenticated visitors to sign up.

Include any additional parameters supported by the embedded pages.

## Summary

This guide shows how resellers can embed VIDA modals using `/embed/modal/v1/script.js`. Load the script, call `vdaModal.open()` with your token and parameters, and handle the optional `onClose` callback to react when the user exits the modal.