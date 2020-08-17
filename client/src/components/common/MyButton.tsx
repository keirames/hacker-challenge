import React from 'react';
import styled, { css } from 'styled-components';
import { Button } from 'antd';
import { NativeButtonProps } from 'antd/lib/button/button';
import { STheme } from '../../theme/theme';

enum Color {
  primary = 'primary',
  secondary = 'secondary',
  thirdary = 'thirdary',
  warning = 'warning',
}

interface Props extends NativeButtonProps {
  color: 'primary' | 'secondary' | 'thirdary' | 'warning';
}

// root element css
const root = css`
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  border-radius: 4px;
  padding: 4px 10px;
  min-height: 30px;
  min-width: 64px;
`;

// Applied to root element if `color="primary"`
const primary = css`
  &.ant-btn-primary {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightBlue};
  }
  &.ant-btn-primary:hover {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue};
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightBlue};
  }
  &.ant-btn-dashed:hover,
  &.ant-btn-ghost:hover,
  &.ant-btn-default:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue};
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightBlue};
  }
  &.ant-btn-text:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkBlue};
  }
`;

// Applied to root element if `color="secondary"`
const secondary = css`
  &.ant-btn-primary {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};
  }
  &.ant-btn-primary:hover {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGreen};
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};
  }
  &.ant-btn-dashed:hover,
  &.ant-btn-ghost:hover,
  &.ant-btn-default:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGreen};
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGreen};
  }
  &.ant-btn-text:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGreen};
  }
`;

// Applied to root element if `color="thirdary"`
const thirdary = css`
  &.ant-btn-primary {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
  }
  &.ant-btn-primary:hover {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkCrimson};
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
  }
  &.ant-btn-dashed:hover,
  &.ant-btn-ghost:hover,
  &.ant-btn-default:hover {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkCrimson};
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
  }
  &.ant-btn-text:hover {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkCrimson};
  }
`;

// Applied to root element if `color="warning"`
const warning = css`
  &.ant-btn-primary {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};
  }
  &.ant-btn-primary:hover {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGold};
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};
  }
  &.ant-btn-dashed:hover,
  &.ant-btn-ghost:hover,
  &.ant-btn-default:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGold};
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGold};
  }
  &.ant-btn-text:hover {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGold};
  }
`;

// Using styles["string"] to call styled css via props
const styles = {
  root,
  primary,
  secondary,
  thirdary,
  warning,
};

const MyButton: React.FC<Props> = (props) => {
  const { color = 'primary', ...rest } = props;

  return <SMyButton color={Color[color]} {...rest} />;
};

const SMyButton = styled(Button)`
  ${styles.root}
  ${({ color }: { color: Color }) => styles[color]}
`;

export default MyButton;
