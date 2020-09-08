import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Popover, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { STheme } from '../../theme/theme';
import { signOut } from '../../services/authService';
import MyButton from '../common/MyButton';

interface Props {
  firstName?: string;
  lastName?: string;
}

const UserOptions: React.FC<Props> = ({ firstName = 'a', lastName = 'b' }) => {
  const handleSignOut = () => {
    signOut();
    window.location.href = '/';
  };

  const content = (
    <Space direction="vertical">
      <MyButton color="primary" type="text" block>
        <FontAwesomeIcon icon="tasks" style={{ marginRight: '5px' }} />
        Merge Accounts
      </MyButton>
      <MyButton color="primary" type="text" block>
        <Link to={`${process.env.PUBLIC_URL}/settings/account`}>
          <FontAwesomeIcon icon="cog" style={{ marginRight: '5px' }} />
          Settings
        </Link>
      </MyButton>
      <MyButton color="thirdary" type="primary" block onClick={handleSignOut}>
        <FontAwesomeIcon icon="sign-out-alt" style={{ marginRight: '5px' }} />
        Sign Out
      </MyButton>
    </Space>
  );

  return (
    <SUserOptions>
      <span>Hello {`${firstName} ${lastName}`}</span>
      <Popover content={content} trigger="click">
        <Space>
          <FontAwesomeIcon icon="id-card" size="2x" />
          <FontAwesomeIcon icon="angle-down" size="1x" />
        </Space>
      </Popover>
    </SUserOptions>
  );
};

const SUserOptions = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.white};
  cursor: pointer;

  span {
    font-weight: 500;
  }

  & > * {
    margin-right: 10px;
  }
`;

export default UserOptions;
