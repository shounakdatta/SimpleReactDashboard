# Simple React Dashboard

Want to make a React App with a dashboard but don't want the hassle to set up login, password reset, and account setup functionality? Well, this repo takes care of that for you.

## Getting started

1. Fork this repo.
2. `cd SimpleReactDashboard`
3. `yarn` or `npm i`

## To view screens without Firebase setup
1. `yarn storybook`

## For full functionality
1. Setup a Firebase Web App at `https://console.firebase.google.com/`
2. Go to `src/config/Fire.js` in your app and replace the Firebase config generated in the Firebase console.
3. `yarn start` or `npm run start`
4. Go to http://localhost:3000
