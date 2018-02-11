This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
Yarn is required for this project.

## Available Scripts

In the project directory, you can run:

### `yarn install`

Installs the project dependencies.

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

REACT_APP_API_PATH can be provided as an environment variable when running yarn start
to set the backend API path. For example:

```
REACT_APP_API_PATH=http://localhost:3005/sendEmail yarn start
```

### `yarn test`

Launches the test runner in the interactive watch mode.

### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Set up a mock server

Run the following command in the project directory to start json-server:

```
npx json-server --watch db.json --port 3005
```

The post request will be sent to json-server when the send button is clicked if
json-server has started and the application is started without setting the REACT_APP_API_PATH.
