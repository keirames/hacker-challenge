import React from "react";
import styled from "styled-components";
import { Container } from "@material-ui/core";
import ChallengeDetails from "../sovleChallenge/ChallengeDetails";
import ScoreTable from "../sovleChallenge/ScoreTable";
import { gql, useQuery } from "@apollo/client";
import { Challenge } from "../../graphql";
import { useParams } from "react-router-dom";

interface IProps {
  style?: React.CSSProperties;
}

interface ChallengeData {
  getChallenge: Challenge;
}

interface ChallengeVars {
  id: string;
}

const GET_CHALLENGE = gql`
  query GetChallenge($id: ID!) {
    getChallenge(id: $id) {
      id
      title
      content
      level
      points
      contest {
        name
      }
      testCases {
        text
        testString
      }
      testInputs
      challengeSeed
    }
  }
`;

const ChallengePage: React.FC<IProps> = (props) => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<ChallengeData, ChallengeVars>(
    GET_CHALLENGE,
    { variables: { id } }
  );

  if (!data?.getChallenge) return null;

  return (
    <SChallengePage style={props.style}>
      <ChallengeDetails challenge={data.getChallenge} />
      {/* <ScoreTable /> */}
    </SChallengePage>
  );
};

const SChallengePage = styled(Container)`
  min-height: 100vh;
`;

export default ChallengePage;
