# U.S. Gun Crime

> A web app that informs users about gun crime trends in the U.S., using over 260,000 incident records scraped from the Gun Violence Archive for the period of 2013–2018. [Data source](https://github.com/jamesqo/gun-violence-data).

## Getting Started

Follow these steps:

1. Clone this repo using your preferred method (`https` or `ssh`).

2. From the root project directory, run `yarn setup`. This will install packages for all directories in succession.

Note: I'd recommend temporarily disabling Windows Defender if you're on Windows. It can significantly slow down the speed of package managers like `yarn`, but you're obviously disabling it at your own risk.

### Environment Variables

We'll need to use environment variables in both the frontend (e.g., for the Google Maps API key) and the backend (e.g., for our DB connection credentials). To avoid exposing sensitive information to the public, we'll introduce new variables via template files that will be checked in to Git. Whenever we add a new environment variable, we'll share its name (but not the *value*) via the template file. **Never** put sensitive information in the templates.

Follow these two steps:

1. In `client/`, make a copy of the `env.template` file and rename it to `.env`.


2. In `server/`, make a copy of the `env_emplate` directory and name it `env`.

### Required VS Code Extensions

1. Install the [TSLint extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for VS Code (the non-deprecated version).

2. Install the [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VS Code.

3. Install the [Path Autocomplete extension](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete) for VS Code.

### Running the App

By default, the frontend runs on `localhost:8000` and the backend on `localhost:3000`. You can now run `yarn dev` from the root directory to launch both the backend and the frontend in parallel (see [Command Cheat Sheet](#command-cheat-sheet) for other commands).

## Contribution Guidelines

### Linting and Code Style

We're not going to enforce any strict rules since it's a course project. TSLint and Prettier will take care of automatically formatting our code for us (see [VS Code Extensions](#required-vs-code-extensions) above).

Assuming you installed the TSLint and Prettier extensions: Do `Ctrl+Shift+P` in VS Code to bring up the command palette. Type `settings json`, and select `Preferences: Open Settings (JSON)`. Copy-paste the following code anywhere in the JSON block:

```json
"editor.formatOnSave": false,
"[javascript]": {
    "editor.formatOnSave": true
},
"[typescript]": {
    "editor.formatOnSave": true
},
"[typescriptreact]": {
    "editor.formatOnSave": true
},
"prettier.tslintIntegration": true,
"prettier.eslintIntegration": true,
"prettier.jsxSingleQuote": false,
"prettier.singleQuote": true,
```

When you save any TypeScript file that has linting errors, VS Code will automatically reformat your code to fix those errors for you.

### Workflow

We're using the [Git feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). This means we won't be directly committing to master.

Whenever you want to contribute a new feature or begin a new iteration of work, run the following commands:

```
git checkout master
git pull origin master
git checkout -b feature-branch-name
```

When you're ready to integrate your new feature into the app, be sure to:

1. Rebase against master
2. Resolve any merge conflicts
3. Push your feature branch

So, assuming you're on your feature branch, run these commands:

```
git fetch && git rebase origin/master
- resolve merge conflicts, if any -
git push
```

Finally, make a pull request to merge your feature branch into `master`.

## Command Cheat Sheet

- Run `yarn setup` from the root directory to install all packages (root + client + server).

- Run `yarn client` from the root directory to launch the frontend (client).

- Run `yarn server` from the root directory to launch the backend (server).

- Run `yarn dev` from the root directory to run the client and server alongside each other, with hot reloading.