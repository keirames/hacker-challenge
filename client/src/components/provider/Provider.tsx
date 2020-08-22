import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { darken } from 'polished';
import {
  GithubOutlined,
  FacebookFilled,
  GoogleOutlined,
} from '@ant-design/icons';
import MyButton from '../common/MyButton';
import { navigateToSocialProvider } from '../../services/authService';
import { STheme } from '../../theme/theme';

interface Props {
  provider: 'google' | 'facebook' | 'github';
  block?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Provider: React.FC<Props> = ({
  provider,
  block = false,
  disabled = false,
  children,
}) => {
  const Github = () => (
    <SGithub
      color="primary"
      type="primary"
      block={block}
      disabled={disabled}
      onClick={() => navigateToSocialProvider('github')}
    >
      {/* <FontAwesomeIcon
        icon={['fab', 'github-alt']}
        style={{ marginRight: '10px' }}
      /> */}
      <GithubOutlined />
      {children}
    </SGithub>
  );

  if (provider === 'github') return <Github />;

  if (provider === 'google')
    return (
      <MyButton
        color="thirdary"
        type="primary"
        block={block}
        disabled={disabled}
        onClick={() => navigateToSocialProvider('google')}
      >
        {/* <FontAwesomeIcon
          icon={['fab', 'google-plus-g']}
          style={{ marginRight: '10px' }}
        /> */}
        <GoogleOutlined />
        {children}
      </MyButton>
    );

  return (
    <MyButton
      color="primary"
      type="primary"
      block={block}
      disabled={disabled}
      onClick={() => navigateToSocialProvider('facebook')}
    >
      {/* <FontAwesomeIcon
        icon={['fab', 'facebook']}
        style={{ marginRight: '10px' }}
      /> */}
      <FacebookFilled />
      {children}
    </MyButton>
  );
};

const SGithub = styled(MyButton)`
  &.ant-btn-primary {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.dark};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.dark};

    &:hover {
      color: white;
      background-color: ${({ theme }: { theme: STheme }) =>
        darken(0.1, theme.palette.common.dark)};
      border-color: ${({ theme }: { theme: STheme }) =>
        darken(0.1, theme.palette.common.dark)};
    }
  }

  &:disabled {
    color: rgba(0, 0, 0, 0.25);
    background: #f5f5f5;
    border-color: #d9d9d9;
    text-shadow: none;
    box-shadow: none;

    &:hover {
      color: rgba(0, 0, 0, 0.25);
      background: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
`;

export default Provider;
