import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumbs, Typography, Container } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import styled from "styled-components";
import { STheme } from "../../theme/theme";

const RouterBreadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <SRouterBreadcrumbs>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <SLink to="/">Home</SLink>
        {pathnames.map((path, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <STypography key={index} variant="body1">
              {path}
            </STypography>
          ) : (
            <SLink key={index} to={to}>
              {path}
            </SLink>
          );
        })}
      </Breadcrumbs>
    </SRouterBreadcrumbs>
  );
};

const SRouterBreadcrumbs = styled(Container)`
  background: transparent;
  min-height: 30px;
  padding: 20px;
`;

const STypography = styled(Typography)`
  text-transform: capitalize;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.black};
`;

const SLink = styled(Link)`
  text-transform: capitalize;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.grey};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export default RouterBreadcrumbs;
