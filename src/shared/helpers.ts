import { v4 as v4UUID } from 'uuid';
import {
  SignUpResult,
  LoginResult,
  ForgotPasswordResult,
  ConfirmPasswordResult,
} from 'src/graphql';

// TODO: Refactor these (get working with a single method - had some issues)
export function createErrorResultFromAWSLoginException(
  error: Record<string, any>,
): LoginResult {
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
        message:
          'Please confirm your account by using the link we sent to your email.',
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

export function createErrorResultFromAWSSignUpException(
  error: Record<string, any>,
): SignUpResult {
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

export function createErrorResultFromAWSForgotPasswordException(
  error: Record<string, any>,
): ForgotPasswordResult {
  const common = {
    id: v4UUID(),
    path: 'user',
    message: error.message,
  };

  switch (error.code) {
    case 'LimitExceededException':
      return {
        ...common,
        __typename: 'LimitExceeded',
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

export function createErrorResultFromAWSConfirmPasswordException(
  error: Record<string, any>,
): ConfirmPasswordResult {
  const common = {
    id: v4UUID(),
    path: 'user',
    message: error.message,
  };
  switch (error.code) {
    case 'ExpiredCodeException':
      return {
        ...common,
        __typename: 'ExpiredCode',
      };
    case 'LimitExceededException':
      return {
        ...common,
        __typename: 'LimitExceeded',
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
