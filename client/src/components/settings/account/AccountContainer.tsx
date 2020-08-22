import React from 'react';
import styled from 'styled-components';
import { gql, useQuery } from '@apollo/client';
import Email from './Email';
import ConnectedAccounts from './ConnectedAccounts';
import { STheme } from '../../../theme/theme';
import DeleteAccounts from './DeleteAccounts';
import { User } from '../../../graphql';

interface GetUserData {
  getMe: User;
}

interface GetUserVars {
  id: number;
}

const GET_USER = gql`
  query GetMe {
    getMe {
      id
      totalPoints
      firstName
      lastName
      userAccount {
        id
        email
      }
      userExternalLogins {
        id
        externalUserId
        email
        firstName
        lastName
        externalAuthenticationProvider {
          id
          name
        }
      }
    }
  }
`;

const AccountContainer: React.FC = () => {
  const { loading, error, data } = useQuery<GetUserData, GetUserVars>(GET_USER);

  if (loading) return <div>Loading</div>;

  if (!data) return <div>Error</div>;

  return (
    <SAccountContainer>
      <Email
        email={data.getMe.userAccount ? data.getMe.userAccount.email : null}
      >
        <STitle>Your Email</STitle>
        <SDescription>
          This is your email address and cannot be change. We will never share
          your email address or display it publicly.
        </SDescription>
      </Email>
      <ConnectedAccounts externalLogins={data.getMe.userExternalLogins}>
        <STitle>Connected Accounts</STitle>
        <SDescription>
          Connect your other accounts with HackerChallenge to share your
          progress and scores and find your friends.
        </SDescription>
      </ConnectedAccounts>
      <DeleteAccounts>
        <STitle>Delete Accounts</STitle>
        <SDescription>
          Delete your account and all information related to your account such
          as your profile page, badges earned and leaderboard positions. Please
          be aware that all data will be permanently lost if you delete your
          account.
        </SDescription>
      </DeleteAccounts>
    </SAccountContainer>
  );
};

const SAccountContainer = styled.div`
  & > * {
    margin: 0 0 10px 0;
    padding-bottom: 20px;
    border-bottom: 1px solid
      ${({ theme }: { theme: STheme }) => theme.palette.common.lightGrey};
  }
`;

const STitle = styled.p`
  font-weight: 500;
  text-transform: capitalize;
  font-size: 1.1rem;
  margin: 0;
`;

const SDescription = styled.span`
  display: block;
  font-weight: lighter;
  margin-bottom: 15px;
`;

export default AccountContainer;
