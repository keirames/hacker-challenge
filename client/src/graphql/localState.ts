import { gql, makeVar } from '@apollo/client';

export const IS_SIGNED_IN = gql`
  query IsUserSignedIn {
    isSignedIn @client
  }
`;

export const isSignedInVar = makeVar<boolean>(false);
