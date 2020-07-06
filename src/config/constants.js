const COGNITO_DEV = {
  REGION: 'us-east-1',
  USER_POOL_ID: 'us-east-1_FhJr25tE4',
  APP_CLIENT_ID: '1rqqvukt1bus3ednr716gimnj',
};
const COGNITO_STG = {
  REGION: 'us-east-1',
  USER_POOL_ID: "us-east-1_GyG5NiBS0",
  APP_CLIENT_ID: "46se4iuqeo1erklcsqi900krb"
};
const COGNITO_PRD = {
  REGION: 'us-east-1',
  USER_POOL_ID: "",
  APP_CLIENT_ID: ""
};
const APIS = {
  SOMLIVRE: 'somlivre-api',
  SOMLIVRE_PUBLIC: 'somlivre-public-api'
};

const STAGES = {
  dev: {
    COGNITO: COGNITO_DEV,
    APIS,
    DOMAIN: 'https://ep7e7kyw92.execute-api.us-east-1.amazonaws.com/dev/',
    COGNITO_DOMAIN: 'somlivre-dev.auth.us-east-1.amazoncognito.com',
    REDIRECT_SIGN_IN: 'http://localhost:3000',
    REDIRECT_SIGN_OUT: 'http://localhost:3000'
  },
  stg: {
    COGNITO: COGNITO_STG,
    APIS,
    DOMAIN: 'https://iftiv01g2f.execute-api.us-east-1.amazonaws.com/stg/',
    COGNITO_DOMAIN: 'somlivre-stg.auth.us-east-1.amazoncognito.com',
    REDIRECT_SIGN_IN: 'https://somlivre.qa.stormgroup.com.br/',
    REDIRECT_SIGN_OUT: 'https://somlivre.qa.stormgroup.com.br/'
  },
  prd: {
    COGNITO: COGNITO_PRD,
    APIS,
    DOMAIN: 'https://ep7e7kyw92.execute-api.us-east-1.amazonaws.com/dev/'
  }
};

const env = process.env.REACT_APP_STAGE || 'dev';
const config = STAGES[env];

export default config;
