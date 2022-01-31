# [Mastermind](https://mastermind-amann.herokuapp.com/)

<a href="https://mastermind-amann.herokuapp.com/" target="_blank"><img src='https://user-images.githubusercontent.com/68879246/151868766-e797f22b-b4b9-471a-a107-baee23981107.png' alt='Mastermind'></a>

**Mastermind** is a number guessing game where a player tries to guess a series of numbers within 10 turns. Users can register to create an account, and scores will be tracked using a MongoDB database. Users can see the history of their scores on the 'Scores' page after logging in.

**_A note on creating an account:_** This is my first time implementing full authentication, and I'm aware that I'm using a somewhat outdated method of doing so. For that reason, it's probably best to not use a password here that you'd use anywhere else!

## Running the project locally

- Clone or download the repo (e.g, `gh repo clone aemann2/mastermind`)
- From the root directory, install backend dependencies using `yarn install`
- In the `/client` directory, install frontend dependencies using `yarn install`
- To run the frontend: run `yarn start` in the `/client` directory. The Frontend is configured to run using the deployed application, so it should start on `http://localhost:3000` without having to start the backend
- To run the backend: run `yarn start` in the root directory. Note the .env.sample file in `/config`. In order for the backend to connect to a database, you must fill in the missing MONGO_URI and JWT_SECRET variables with your own. The backend will run on `http://localhost:5000`.
- To run frontend tests: run `yarn test` in the `/client` directory
- To run backend tests: run `yarn test` in the root directory

## Game rules:

- At the start of the game the computer will randomly select a pattern of four different numbers from a total of 8 different numbers (the numbers 0 - 7).
- A player will have 10 attempts to guess the number combinations
- At the end of each guess, the computer will provide a response with the following feedback:
  - The player guessed a correct number, but in the wrong location
  - The player guessed a correct number in the correct location
  - The player’s guess was incorrect

## Technology:

### Backend:

Typescript, Node.js, Express, Mongoose, MongoDB, bcrypt, jwt, Mocha, Chai

### Frontend:

React, Typescript, CSS Modules, React Testing Library, Jest, Mock Service Worker

## What I learned or used for the first time

- Full stack authentication using bcrypt and jwt
- A custom-made random number generator (which I was forced to build after my IP was blocked from [https://www.random.org](https://www.random.org)!)
- Typescript for backend
- Authentication middleware
- Mocha and Chai for backend unit testing

# Create React App boilerplate ReadMe:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the /client directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
