// Uncomment to switch when using a non dockerized instance (switches the db and server config, requires mongo to be running locally)
export const ENVIRONMENT = process.env.HOST_ENVIRONMENT || 'development';

export const cognitoTokenTypes = {
  id: 'id',
  access: 'access',
  refresh: 'refresh',
};

export const __typeNames = {
  ErrorResult: 'ErrorResult',
  ValidationFailed: 'ValidationFailed',
  CognitoError: 'CognitoError',
  UsernameNotFound: 'UsernameNotFound',
  UserNotConfirmed: 'UserNotConfirmed',
  UsernameExists: 'UsernameExists',
  IncorrectCredentials: 'IncorrectCredentials',
  TooManyPasswordAttempts: 'TooManyPasswordAttempts',
  User: 'User',
  IQuery: 'IQuery',
  CognitoAccessToken: 'CognitoAccessToken',
  CognitoTokens: 'CognitoTokens',
  IMutation: 'IMutation',
};
