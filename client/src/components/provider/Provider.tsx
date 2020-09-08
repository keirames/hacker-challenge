import React from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { useQuery, gql } from '@apollo/client';
import {
  GithubOutlined,
  FacebookFilled,
  GoogleOutlined,
} from '@ant-design/icons';
import MyButton from '../common/MyButton';
import { navigateToSocialProvider } from '../../services/authService';
import { STheme } from '../../theme/theme';
import { GetMeData } from '../../interfaces';

interface Props {
  provider: 'google' | 'facebook' | 'github';
  type: 'merge' | 'signin';
  block?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const GET_ME = gql`
  query GetMe {
    getMe {
      userTokenDecode @client
    }
  }
`;

const Provider: React.FC<Props> = ({
  provider,
  type,
  block = false,
  disabled = false,
  children,
}) => {
  const { data, error } = useQuery<GetMeData>(GET_ME);

  if (provider === 'github')
    return (
      <SGithub
        color="primary"
        type="primary"
        block={block}
        disabled={disabled}
        onClick={() =>
          navigateToSocialProvider({
            provider: 'github',
            type,
            userId: data?.getMe.userTokenDecode.sub,
          })
        }
      >
        {/* <FontAwesomeIcon
        icon={['fab', 'github-alt']}
        style={{ marginRight: '10px' }}
      /> */}
        <GithubOutlined />
        {children}
      </SGithub>
    );

  if (provider === 'google')
    return (
      <MyButton
        color="thirdary"
        type="primary"
        block={block}
        disabled={disabled}
        onClick={() =>
          navigateToSocialProvider({
            provider: 'google',
            type,
            userId: data?.getMe.userTokenDecode.sub,
          })
        }
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
      onClick={() =>
        navigateToSocialProvider({
          provider: 'facebook',
          type,
          userId: data?.getMe.userTokenDecode.sub,
        })
      }
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
