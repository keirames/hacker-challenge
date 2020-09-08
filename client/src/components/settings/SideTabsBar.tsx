import React from 'react';
import { Tabs, Typography } from 'antd';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';

const { TabPane } = Tabs;

const SideTabsBar: React.FC = () => {
  const { push } = useHistory();
  const { path } = useRouteMatch();

  const handleTabClick = (key: string): void => {
    push(`${path}/${key}`);
  };

  return (
    <SSideTabsBar>
      <Typography.Paragraph
        style={{ fontWeight: 'bold', textTransform: 'uppercase' }}
      >
        Account
      </Typography.Paragraph>
      <Tabs tabPosition="left" onChange={handleTabClick}>
        <TabPane tab="Settings" key="account" />
        <TabPane tab="Password" key="password" />
      </Tabs>
    </SSideTabsBar>
  );
};

const SSideTabsBar = styled.div`
  & > * {
    margin: 0 auto;
    width: 50%;
  }

  .ant-tabs-content-holder {
    display: none;
  }
`;

export default SideTabsBar;
