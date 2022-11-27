# resports-schedule

The varsity esports schedule website for Radford Esports.

## Client

The main page of the app has a responsive schedule page that updates when the [firestore](https://firebase.google.com/docs/firestore) back-end is changed with [react-firebase-hooks](https://github.com/CSFrequency/react-firebase-hooks/blob/master/firestore/README.md). No matches from the previous day or older will be displayed on the UI. It is also set on an interval to update changed UI elements every 10s (primary for the time formatting). This page should never need a refresh to update the UI, and can be left up statically and unattended.

![Schedule page](https://i.imgur.com/0pdAly1.png)

## Admin

The admin page can be accessed by clicking the logo on the top of the schedule page.

![Logo](https://i.imgur.com/QoiJq5g.png)

### Sign-in page

If you're not already signed in you will be redirected to the sign-in page where you must enter valid [firebase auth](https://firebase.google.com/docs/auth) credentials to access the admin page.

![Sign-in page](https://i.imgur.com/oPsfHON.png)

### Admin page

Once authenticated you'll have access to the admin page where you can add new matches to the schedule. And you can click the logo in the top right to navigate back to the schedule page or logout.

![Admin page](https://i.imgur.com/wXXQBLK.png)

### Schedule modification

Admins can get extra context on the individual matches in the schedule page by hovering over them. On the left is the hidden firestore id behind each match. And on the right is a context button that opens up the modification modal.

![Match context](https://i.imgur.com/6siKkPq.png)

#### Modification modal

Here you can choose to modify or delete a match.

![Modification modal](https://i.imgur.com/flIkwDX.png)

### Extras

- It is also important to note that when an authenticated user (admin) visits the schedule page, any matches older that 1 days past it's start time will be deleted permenatly from firestore. This is to maintain low useage on database to remain at the free tier.
- The security permissions set up in the [firestore security rules](https://firebase.google.com/docs/firestore/security/rules-structure) are made so that no writes can be made to any data unless it's from an authenticated user. Any user can make reads, because all the data is meant to be public.
- Adding new users can only be done through the [firebase console](https://console.firebase.google.com/). This app is really not meant to be making new accounts as they have full access over the data. This is a security measure. 

## Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
