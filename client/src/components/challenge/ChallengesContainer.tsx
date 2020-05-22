import React from "react";
import styled from "styled-components";
import { Challenge } from "../../graphql";
import ChallengeBlock from "./ChallengeBlock";

const ChallengesContainer: React.FC<{
  challenges: Challenge[] | undefined;
}> = ({ challenges }) => {
  return (
    <SChallengesContainer>
      {challenges?.map((challenge) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} />
      ))}
    </SChallengesContainer>
  );
};

const SChallengesContainer = styled.div``;

export default ChallengesContainer;
