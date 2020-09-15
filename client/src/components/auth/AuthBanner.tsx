import { Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { lighten } from 'polished';
import { STheme } from '../../theme/theme';

const AuthBanner: React.FC = () => {
  return (
    <SAuthBanner>
      <Typography.Title level={1}>Hacker Challenge</Typography.Title>
      <Typography.Paragraph>
        Practice coding, prepare for interviews, and get hired.
      </Typography.Paragraph>
    </SAuthBanner>
  );
};

const SAuthBanner = styled.div`
  text-align: center;
  margin-bottom: 50px;

  & > * {
    color: ${({ theme }: { theme: STheme }) =>
      lighten(0, theme.palette.common.dark)} !important;
  }
`;

export default AuthBanner;
