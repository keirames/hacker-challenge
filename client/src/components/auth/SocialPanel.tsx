import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography, Space } from 'antd';
import styled from 'styled-components';
import { STheme } from '../../theme/theme';
import { navigateToSocialProvider } from '../../services/authService';
import MyButton from '../common/MyButton';
import Provider from '../provider/Provider';

const SocialPanel: React.FC = (props) => {
  return (
    <SSocialPanel direction="vertical" size="middle">
      <div>
        <Typography.Title level={4}>Social Account</Typography.Title>
        <span>Select any provider !</span>
      </div>
      <Provider provider="github" block>
        github
      </Provider>
      <Provider provider="facebook" block>
        facebook
      </Provider>
      <Provider provider="google" block>
        google
      </Provider>
    </SSocialPanel>
  );
};

const SSocialPanel = styled(Space)`
  width: 300px;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  padding: 20px;
  border-radius: 5px;
  text-align: center;
`;

export default SocialPanel;
