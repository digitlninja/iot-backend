import { v4 as v4UUID } from 'uuid';
import { SignUpResult, LoginResult } from 'src/graphql';

export function createErrorResultFromAWSLoginException(error): LoginResult {
  const common = {
    id: v4UUID(),
    path: 'user',
    message: error.message,
  };

  switch (error.code) {
    case 'NotAuthorizedException':
      if (error.message === 'Password attempts exceeded')
        return {
          ...common,
          message:
            'Password attempts exceeded. Please try again in a few minutes.',
          __typename: 'TooManyPasswordAttempts',
        };
      return {
        ...common,
        __typename: 'IncorrectCredentials',
      };
    case 'UserNotConfirmedException':
      return {
        ...common,
        __typename: 'UserNotConfirmed',
        message: 'Please confirm your account by clicking on the verify link.',
      };
    default:
      return {
        id: v4UUID(),
        path: 'user',
        message: error.message,
        __typename: 'ErrorResult',
      };
  }
}

export function createErrorResultFromAWSSignUpException(error): SignUpResult {
  const common = {
    id: v4UUID(),
    path: 'user',
    message: error.message,
  };

  switch (error.code) {
    case 'UsernameExistsException':
      return {
        ...common,
        __typename: 'UsernameExists',
      };
    default:
      return {
        id: v4UUID(),
        path: 'user',
        message: error.message,
        __typename: 'ErrorResult',
      };
  }
}
