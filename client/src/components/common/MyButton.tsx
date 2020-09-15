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
  /* padding: 4px 10px; */
  /* min-height: 25px; */
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

    &:hover {
      color: white;
      background-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkBlue};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkBlue};
    }
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightBlue};

    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkBlue};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue};
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightBlue};

    &:hover {
      color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkBlue};
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

// Applied to root element if `color="secondary"`
const secondary = css`
  &.ant-btn-primary {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};

    &:hover {
      color: black;
      background-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGreen};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGreen};
    }
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGreen};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGreen};

    &:hover {
      color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGreen};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGreen};
    }
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGreen};

    &:hover {
      color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGreen};
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

// Applied to root element if `color="thirdary"`
const thirdary = css`
  &.ant-btn-primary {
    color: white;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};

    &:hover {
      color: white;
      background-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkCrimson};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkCrimson};
    }
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};

    &:hover {
      color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkCrimson};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkCrimson};
    }
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightCrimson};

    &:hover {
      color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkCrimson};
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

// Applied to root element if `color="warning"`
const warning = css`
  &.ant-btn-primary {
    color: black;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};

    &:hover {
      color: black;
      background-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGold};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGold};
    }
  }

  &.ant-btn-dashed,
  &.ant-btn-ghost,
  &.ant-btn-default {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGold};
    border-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGold};

    &:hover {
      color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGold};
      border-color: ${({ theme }: { theme: STheme }) =>
        theme.palette.common.darkGold};
    }
  }

  &.ant-btn-text {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightGold};

    &:hover {
      color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGold};
    }
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
