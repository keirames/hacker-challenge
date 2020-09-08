import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import Links from './Links';
import UserOptions from './UserOptions';
import { STheme } from '../../theme/theme';
import Logo from './Logo';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import MyButton from '../common/MyButton';
import { GetMeData } from '../../interfaces';

interface Props {
  enableBreadcrumbs?: boolean;
}

const GET_ME = gql`
  query GetMe {
    getMe {
      userTokenDecode @client
    }
  }
`;

const NavBar: React.FC<Props> = ({ enableBreadcrumbs = true }) => {
  const { data } = useQuery<GetMeData>(GET_ME);

  return (
    <>
      <SNavBar>
        <Logo />
        <Links />
        {/* <Burger /> */}
        {data?.getMe.userTokenDecode ? (
          <UserOptions
            firstName={data.getMe.userTokenDecode.firstName}
            lastName={data.getMe.userTokenDecode.lastName}
          />
        ) : (
          <Link
            to={`${process.env.PUBLIC_URL}/auth/signIn`}
            style={{ textDecoration: 'none' }}
          >
            <MyButton color="primary" type="primary" size="small">
              Sign In
            </MyButton>
          </Link>
        )}
      </SNavBar>
      {enableBreadcrumbs && <RouterBreadcrumbs />}
    </>
  );
};

const SNavBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.dark};
  min-height: 55px;
`;

export default NavBar;
