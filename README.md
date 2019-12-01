# ⚖️ U.S. Gun Crime

> A web app that informs users about gun crime trends in the U.S., using over 230,000 incident records scraped from the Gun Violence Archive for the period of 2013–2018. [Data source](https://github.com/jamesqo/gun-violence-data).

**Note**: This was developed as a course project at the University of Florida. For our class, we were required by the instructor to use the Oracle database hosted at our university, which is behind a VPN. This has two unfortunate consequences:

- The app cannot be hosted publicly (e.g., on Heroku) unless the tables are migrated to a different database.

- You will not see any data when you run the app. You can, however, explore the frontend itself and our backend logic.

## Table of Contents

1. [Demo Video](#demo-video)
2. [Getting Started: Running the App](#getting-started-running-the-app)
   - [Setting Up the Environment Variables](#setting-up-the-environment-variables)
   - [Installing Recommended VS Code Extensions](#installing-recommended-vs-code-extensions)
3. [Database Schema Overview](#database-schema-overview)
4. [How the Data Was Obtained](#how-the-data-was-obtained)
5. [Contribution Guidelines](#contribution-guidelines)
   - [Linting and Code Style](#linting-and-code-style)
   - [Git Workflow](#git-workflow)
6. [Command Cheat Sheet](#command-cheat-sheet)
7. [Sources and Attributions](#sources-and-attributions)

## Demo Video

Here's a [YouTube video](https://www.youtube.com/watch?v=61FSc-E7b9U) walking through the app on a local environment:

[![](https://img.youtube.com/vi/61FSc-E7b9U/maxresdefault.jpg)](https://www.youtube.com/watch?v=61FSc-E7b9U)

## Getting Started: Running the App

1. Clone this repo using your preferred method (`https` or `ssh`).

2. From the root project directory, run `yarn setup`. This will install packages for all directories in succession (top-level, client, and server).

Note: I'd recommend temporarily disabling Windows Defender if you're on Windows. It can significantly slow down the speed of package managers like `yarn`, but you're obviously disabling it at your own risk.

3. Run `yarn client` from the root project directory to launch the frontend. You can also run `yarn dev` to launch both the frontend and the backend, but again, note that the backend will not work for you.

By default, the frontend runs on `localhost:8000` and proxies the backend, which runs on `localhost:3000`.

See the [Command Cheat Sheet](#command-cheat-sheet) for a list of available commands.

### Setting Up the Environment Variables

We'll need to use environment variables in both the frontend (e.g., for the Google Maps API key) and the backend (e.g., for our DB connection credentials). To avoid exposing sensitive information to the public, we'll introduce new variables via template files that will be checked in to Git. Whenever we add a new environment variable, we'll share its name (but not the *value*) via the template file. **Never** put sensitive information in the templates.

Follow these two steps:

1. In `client/`, make a copy of the `env.template` file and name it `.env`.


2. In `server/`, make a copy of the `env_emplate` directory and name it `env`.

> Note: We decided not to use Google Maps, so the frontend environment template is currently empty.

### Installing Recommended VS Code Extensions

1. Install the [TSLint extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-tslint-plugin) for VS Code (the non-deprecated version).

2. Install the [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) for VS Code.

3. Install the [Path Autocomplete extension](https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete) for VS Code.

## Database Schema Overview

Below are the SQL commands that were used to create our tables in Oracle:

```sql
CREATE TABLE Incident
(
    id INT NOT NULL,
    i_date DATE NOT NULL,
    n_killed INT NOT NULL, CHECK (n_killed >= 0),
    n_injured INT NOT NULL, CHECK (n_injured >= 0),
    n_guns_involved INT, CHECK (n_guns_involved > 0),
    notes VARCHAR2(260),
    latitude NUMBER NOT NULL,
    longitude NUMBER NOT NULL,
    source_url VARCHAR2(255),
    PRIMARY KEY(id),
    FOREIGN KEY(latitude, longitude) REFERENCES Location(latitude, longitude)
);

CREATE TABLE IncidentCharacteristic
(
    incident_id INT NOT NULL,
    incident_characteristic VARCHAR(100) NOT NULL,
    PRIMARY KEY(incident_characteristic, incident_id),
    FOREIGN KEY(incident_id) REFERENCES Incident(id)
);

CREATE TABLE Location
(
    latitude NUMBER NOT NULL,
    longitude NUMBER NOT NULL,
    city_or_county VARCHAR(50) NOT NULL,
    state VARCHAR(20) NOT NULL,
    state_house_district INT,
    state_senate_district INT,
    PRIMARY KEY(latitude, longitude)
);

CREATE TABLE Participant
(
    id INT NOT NULL,
    name VARCHAR(150),
    age INT, CHECK (age >= 0 AND age <= 150),
    gender CHAR(1), CHECK(gender='M' OR gender = 'F'),
    type VARCHAR(15), CHECK(type='Victim' OR type= 'Subject-Suspect'),
    relationship VARCHAR(41),
    status VARCHAR(27),
    PRIMARY KEY(id),
    incident_id INT NOT NULL,
    FOREIGN KEY(incident_id) REFERENCES Incident(id) 
);

CREATE TABLE Gun
(
    id INT NOT NULL,
    incident_id INT NOT NULL,
    type VARCHAR(15),
    stolen NUMBER(1), CHECK (stolen = 0 OR stolen = 1),
    PRIMARY KEY(id),
    FOREIGN KEY(incident_id) REFERENCES Incident(id)
);

CREATE TABLE StatePopulation
(
    state VARCHAR(20) NOT NULL,
    year NUMBER(4) NOT NULL, CHECK(year >= 2013 AND year <= 2018),
    population NUMBER NOT NULL, CHECK(population > 0),
    PRIMARY KEY(state, year)
);
```

## How the Data Was Obtained

Our app uses data from the [gun-violence-data](https://github.com/jamesqo/gun-violence-data) repository, which provides a single CSV of 230,000+ gun crime incidents scraped from the [Gun Violence Archive](https://www.gunviolencearchive.org/) for the period of 2013–2018.

Unfortunately, much of the data had formatting and quality issues that would've made it unusable for our database project. For example, many fields contained delimited values that needed to be extracted into individual rows:

<br>

![](https://user-images.githubusercontent.com/19352442/69900947-438b5800-1348-11ea-8a78-284556bd8563.png)

<br>

In the [data preprocessing stage of our project](https://github.com/CIS4301-Project-University-of-Florida/U.S.-Gun-Crime/projects/1), we wrote a number of Python scripts that split this single CSV into individual, normalized CSVs for each entity. Below is an example for participants:

<br>

![](https://user-images.githubusercontent.com/19352442/69900940-e7c0cf00-1347-11ea-906a-0f5356b67500.png)

<br>

A supplemenary entity, `StatePopulation`, was introduced later in the project based on [an additional data set from the U.S. Census Bureau](https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html#par_textimage_1574439295) for state populations. This is used to compare states based on deaths per capita.

After all of the CSVs were generated, we used Oracle SQL Developer's SQL*Loader utility to bulk-load the CSVs into our database. In total, there are 1.5 million tuples spread across the six tables above:

<br>

![](https://user-images.githubusercontent.com/19352442/69903354-151c7580-1366-11ea-8e84-651e40e51db8.png)

## Contribution Guidelines

> Note: This was originally written as a guide for the group. We are not accepting contributions. If you notice bugs or any other issues, though, please [do let us know](https://github.com/CIS4301-Project-University-of-Florida/U.S.-Gun-Crime/issues/new).

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
"prettier.jsxSingleQuote": false,
"prettier.singleQuote": true,
```

When you save any TypeScript file that has linting errors, VS Code will automatically reformat your code to fix those errors for you.

### Git Workflow

We're using the [Git feature branch workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow). This means we won't be directly committing to master, except for small changes here and there that don't require group approval.

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

## Sources and Attributions

- [Gun crime data set](https://github.com/jamesqo/gun-violence-data)

- [express-generator-typescript](https://github.com/seanpmaxwell/express-generator-typescript/blob/master/LICENSE) (MIT), by Sean Maxwell

- [U.S. Census Bureau State Population Totals for 2010–2018](https://www.census.gov/data/tables/time-series/demo/popest/2010s-state-total.html#par_textimage_1574439295)
