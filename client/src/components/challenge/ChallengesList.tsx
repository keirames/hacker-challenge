import React from 'react';
import styled from 'styled-components';
import { Space } from 'antd';
import { Challenge } from '../../graphql';
import ChallengeBlock from './ChallengeBlock';
import { STheme } from '../../theme/theme';

const ChallengesList: React.FC<{
  challenges: Challenge[];
}> = ({ challenges }) => {
  if (challenges.length === 0)
    return (
      <SChallengesList>
        <SEmptyBlock>Empty Challenges</SEmptyBlock>
      </SChallengesList>
    );

  return (
    <SChallengesList direction="vertical" size="middle">
      {challenges.map((challenge) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} />
      ))}
    </SChallengesList>
  );
};

const SChallengesList = styled(Space)`
  width: 100%;
`;

const SEmptyBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100px;
  margin-top: 10px;
  font-size: ${({ theme }: { theme: STheme }) =>
    theme.typography.fontSize.large};
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.lightGrey};
`;

export default ChallengesList;
