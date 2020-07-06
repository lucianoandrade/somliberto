import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import config from "./config/constants";
import Amplify, { Auth } from "aws-amplify";
import { Provider } from "react-redux";
import store from "./store";

const COMMON = {
  region: config.COGNITO.REGION,
  custom_header: async () => {
    return {
      Authorization: (await Auth.currentSession()).idToken.jwtToken,
    };
  },
};

Amplify.configure({
  Auth: {
    region: config.COGNITO.REGION,
    userPoolId: config.COGNITO.USER_POOL_ID,
    userPoolWebClientId: config.COGNITO.APP_CLIENT_ID,
  },
  API: {
    endpoints: [
      {
        name: config.APIS.SOMLIVRE,
        endpoint: config.DOMAIN,
        ...COMMON,
      },
      {
        name: config.APIS.SOMLIVRE_PUBLIC,
        endpoint: config.DOMAIN
      },
    ],
  },
});
const oauth = {
  domain: config.COGNITO_DOMAIN,
  scope: ['phone', 'email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
  redirectSignIn: config.REDIRECT_SIGN_IN,
  redirectSignOut: config.REDIRECT_SIGN_OUT,
  responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
};


Auth.configure({ oauth });
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
