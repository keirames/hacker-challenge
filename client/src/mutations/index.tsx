import { gql } from "apollo-boost";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }
`;

export interface LoginUserDetails {
  username: string;
  password: string;
}

// Register
export interface NewUserDetails {
  firstname: string;
  lastname: string;
  username: string;
  password: string;
}

export const REGISTER = gql`
  mutation register($user: UserInput!) {
    register(user: $user) {
      token
    }
  }
`;
