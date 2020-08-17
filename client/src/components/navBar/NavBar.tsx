import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import Burger from './Burger';
import Links from './Links';
import UserOptions from './UserOptions';
import { GET_USER_CLIENT } from '../../mutations';
import { STheme } from '../../theme/theme';
import Logo from './Logo';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import MyButton from '../common/MyButton';

const NavBar: React.FC = (props) => {
  const { data } = useQuery(GET_USER_CLIENT);

  return (
    <>
      <SNavBar>
        <Logo />
        <Links />
        {/* <Burger /> */}
        {data?.user ? (
          <UserOptions />
        ) : (
          <Link to="/signIn" style={{ textDecoration: 'none' }}>
            <MyButton color="primary" type="primary" size="small">
              Sign In
            </MyButton>
          </Link>
        )}
      </SNavBar>
      <RouterBreadcrumbs />
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
  min-height: 5vh;
`;

export default NavBar;
