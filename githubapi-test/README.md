# Introduction

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

All details requested in the document have been made, but there are a few things that should be highlighted.

The development was done with TDD in mind, but the time was limited, so there are many scenarios that the tests do not cover such as when the API returns a status other than 200 or there are no forks and / or badges or the researched user does not exist. To see the integration tests files please go to `./cypress/integration/getting_gists.ts`.

As for unit testing, I did tests for 2 components and they do not cover all the branches for the same reason above. To see the unit tests, please fo to `./src/components/Forks/Forks.test.tsx` and `./src/components/Search.test.tsx`; 

The application does not have some common features, such as loading or error feedback and the layout is simple. Bootstrap was used to focus on resources first and save time.

## Instaling the application

- clone the project with git: `git clone https://github.com/marioteik/githubapi-test.git`.
- enter the project's folder with `cd githubapi-test`.
- execute `npm install` to install dependencies.

## Authorizating GitHub API

- go to [Personal access tokens](https://github.com/settings/tokens) at GitHub.
- click in `Generate new token`.
- select `public repositories` option, git a name to the token and click to generate.
- go to the project's folder, in the file `.env.development` add the generated token after `REACT_APP_GITHUB_TOKEN=`.
- run the application.

## Running the project

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run e2e`

Lauches cypress to run the e2e automated tests in the application.

You have to execute `npm start` on another terminal to run tests toguether with the application.