import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
// import Burger from './Burger';
import Links from './Links';
import UserOptions from './UserOptions';
import { STheme } from '../../theme/theme';
import Logo from './Logo';
import RouterBreadcrumbs from './RouterBreadcrumbs';
import MyButton from '../common/MyButton';
import { isSignedInVar } from '../../graphql/localState';

interface Props {
  enableBreadcrumbs?: boolean;
}

const NavBar: React.FC<Props> = ({ enableBreadcrumbs = true }) => {
  const isSignedIn = useReactiveVar(isSignedInVar);

  return (
    <>
      <SNavBar>
        <Logo />
        <Links />
        {/* <Burger /> */}
        {isSignedIn ? (
          <UserOptions />
        ) : (
          // todo: link outside button and vice versa is not good.
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
