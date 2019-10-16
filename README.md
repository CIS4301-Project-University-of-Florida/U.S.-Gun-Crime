# U.S. Gun Crime

> A web app that informs users about gun crime trends in the U.S., using over 260,000 incident records scraped from the Gun Violence Archive for the period of 2013–2018. [Data source](https://github.com/jamesqo/gun-violence-data).

## Getting Started

1. Clone the project using one of these two:
   - https: `git clone https://github.com/CIS4301-Project-University-of-Florida/U.S.-Gun-Crime.git`
   - ssh: `git clone git@github.com:CIS4301-Project-University-of-Florida/U.S.-Gun-Crime.git`

2. `cd` into `client` and run `yarn` to install all packages.

   - Note: I'd recommend temporarily disabling Windows Defender if you're on Windows. It can significantly slow down the speed of package managers like `npm` and `yarn`, but you're obviously disabling it at your own risk.

3. Repeat #2 for `server` to install all of the back-end packages.

That's it! You should be good to go.

## Command Cheat Sheet

- Run `yarn client` from the root directory to change your working directory to `client` and launch the frontend.

- Run `yarn server` from the root directory to change your working directory to `server` and launch the backend server.

- Run `yarn dev` to do both of the above concurrently.

## Contribution Guidelines

### Linting and Code Style

We're not going to enforce any strict rules since it's a course project. Code however you want and in whatever style you prefer; TSLint and Prettier will take care of automatically formatting our code in a consistent manner.

Follow these simple steps:

1. Install the [TSLint extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for VS Code (the non-deprecated version).

2. Install the [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VS Code.

3. Do `Ctrl+Shift+P` in VS Code to bring up the command palette. Type `settings json`, and select `Preferences: Open Settings (JSON)`. Copy-paste the following code anywhere in the JSON block:

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

Let's say you used double quotes instead of single quotes, or your code is not indented properly, or you have a curly brace where it doesn't belong. When you save the file, VS Code will automatically reformat your code to fix those minor errors for you.

### Workflow

We're using the [Git feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). This means we won't be directly committing to master.

When you want to contribute a new feature, run the following commands:

```
git checkout master
git pull origin master
git checkout -b feature-branch-name
```

When you're ready to integrate your new feature into the app, be sure to:

1. Rebase against master
2. Resolve any merge conflicts
3. Push your feature branch

Assuming you're on your feature branch, run these commands:

```
git fetch && git rebase origin/master
- resolve merge conflicts, if any -
git push
```

Finally, make a pull request to merge your feature branch into `master`.

