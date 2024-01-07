# Code Note

Chrome extension to add notes to your code without commiting them.
This is a simple tool to enhance your productivity and help you reading external code.
The notes are visible ONLY to you, nothing leaves your device.
All data is stored in local storage.

## Requirements

-   `node`
-   `pnpm`

## Getting Started

First, run the development server:

```bash
pnpm install
pnpm dev
```

Open your browser and load the appropriate development build. For example, if you are developing for the chrome browser, using manifest v3, use: `build/chrome-mv3-dev`.

## Making production build

Run the following:

```bash
pnpm build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.
