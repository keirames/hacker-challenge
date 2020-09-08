import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { Breadcrumb, Typography } from 'antd';
import { STheme } from '../../theme/theme';

const RouterBreadcrumbs: React.FC = () => {
  const location = useLocation();

  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <SRouterBreadcrumbs>
      <Breadcrumb>
        <Breadcrumb.Item>
          <SLink to="/">Home</SLink>
        </Breadcrumb.Item>
        {pathnames.map((path, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join('/')}`;

          return last ? (
            // eslint-disable-next-line react/no-array-index-key
            <Breadcrumb.Item key={index}>
              <STypography>{path}</STypography>
            </Breadcrumb.Item>
          ) : (
            // eslint-disable-next-line react/no-array-index-key
            <Breadcrumb.Item key={index}>
              <SLink to={to}>{path}</SLink>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </SRouterBreadcrumbs>
  );
};

const SRouterBreadcrumbs = styled.div`
  width: 70%;
  margin: auto;
  background: transparent;
  min-height: 30px;
  padding: 20px;
`;

const STypography = styled(Typography.Text)`
  text-transform: capitalize;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.black};
`;

const SLink = styled(Link)`
  text-transform: capitalize;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.grey};
  text-decoration: none;

  &:hover {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue} !important;
    text-decoration: underline;
  }
`;

export default RouterBreadcrumbs;
