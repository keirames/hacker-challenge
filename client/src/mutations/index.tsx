import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export interface LoginUserDetails {
  email: string;
  password: string;
}

// Register
export interface NewUserDetails {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const SIGN_UP = gql`
  mutation signUp($accountDetails: AccountDetails!) {
    signUp(accountDetails: $accountDetails)
  }
`;

// Local state
export const GET_USER_CLIENT = gql`
  query GetUser {
    user @client
  }
`;
