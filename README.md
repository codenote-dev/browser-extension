# Code Note

Browser extension designed to enhance your GitHub and GitLab experience by allowing you to add notes to existing code without making any commits. This tool is perfect for code reviews, studying code, or simply jotting down your thoughts and ideas while browsing through repositories.

All notes are stored locally on your machine, ensuring your notes remain private and accessible even when you're offline. The extension integrates seamlessly with GitHub's and GitLab's interfaces, providing a side panel where you can view and manage your comments.

Whether you're a developer, a student, or someone who frequently works with code on GitHub and/or GitLab, CodeNote.dev offers a new level of interaction with code. Try it today and experience a more productive and personalized way of exploring code on GitHub and GitLab.

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

## Package extension

Run the following:

```bash
pnpm package
```
