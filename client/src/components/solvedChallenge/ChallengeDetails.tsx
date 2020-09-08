import React, { useState } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';
import { Challenge } from '../../graphql';
import Problem from './Problem';
import Submissions from './Submissions';
import { STheme } from '../../theme/theme';

const { TabPane } = Tabs;

interface Props {
  style?: React.CSSProperties;
  challenge: Challenge;
}

const ChallengeDetails: React.FC<Props> = (props) => {
  const [tabValue, setTabValue] = useState<string>('');

  return (
    <STabs style={props.style} className="card-container">
      <Tabs
        defaultActiveKey="1"
        size="middle"
        type="card"
        onChange={(activeKey: string) => setTabValue(activeKey)}
      >
        <TabPane tab="Problem" key="1">
          <Problem challenge={props.challenge} />
        </TabPane>
        <TabPane tab="Submission" key="2">
          <Submissions />
        </TabPane>
      </Tabs>
    </STabs>
  );
};

const STabs = styled.div`
  .ant-tabs-tab,
  .ant-tabs-tab-active,
  .ant-tabs-tab-btn {
    color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkBlue} !important;
  }

  .ant-tabs-nav {
    margin: 0;
  }
`;

export default ChallengeDetails;
