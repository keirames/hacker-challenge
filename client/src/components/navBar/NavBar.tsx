import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme";
import Logo from "./Logo";
import Burger from "./Burger";
import { Hidden, Button } from "@material-ui/core";
import Links from "./Links";
import UserOptions from "./UserOptions";
import { GET_USER_CLIENT } from "../../mutations";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import RouterBreadcrumbs from "./RouterBreadcrumbs";

const NavBar: React.FC = (props) => {
  const { data } = useQuery(GET_USER_CLIENT);

  return (
    <>
      <SNavBar>
        <Logo />
        <Links />
        <Hidden lgUp>
          <Burger />
        </Hidden>
        {data?.user ? (
          <UserOptions />
        ) : (
          <Link to="/signIn" style={{ textDecoration: "none" }}>
            <Button variant="contained" color="primary" size="small">
              Sign In
            </Button>
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
