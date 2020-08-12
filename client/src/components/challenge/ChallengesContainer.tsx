import React from "react";
import styled from "styled-components";
import { Challenge } from "../../graphql";
import ChallengeBlock from "./ChallengeBlock";
import { STheme } from "../../theme/theme";
import { Space } from "antd";

const ChallengesContainer: React.FC<{
  challenges: Challenge[];
}> = ({ challenges }) => {
  if (challenges.length === 0)
    return (
      <SChallengesContainer>
        <SEmptyBlock>Empty Challenges</SEmptyBlock>
      </SChallengesContainer>
    );

  return (
    <SChallengesContainer direction="vertical" size="middle">
      {challenges.map((challenge) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} />
      ))}
    </SChallengesContainer>
  );
};

const SChallengesContainer = styled(Space)`
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

export default ChallengesContainer;
