import React from "react";
import styled from "styled-components";
import { Container, Grid } from "@material-ui/core";
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
  slug: string;
}

const GET_CHALLENGE = gql`
  query GetChallenge($slug: String!) {
    getChallenge(slug: $slug) {
      id
      title
      slug
      content {
        problem
        inputSample
        outputSample
      }
      level
      points
      passedUser {
        username
      }
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
  const { slug } = useParams();

  const { data, loading, error } = useQuery<ChallengeData, ChallengeVars>(
    GET_CHALLENGE,
    { variables: { slug } }
  );

  if (!data?.getChallenge) return null;

  return (
    <SChallengePage style={props.style}>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <ChallengeDetails challenge={data.getChallenge} />
        </Grid>
        <Grid item xs={3}>
          <ScoreTable
            level={data.getChallenge.level}
            points={data.getChallenge.points}
            passedUser={data.getChallenge.passedUser.length}
          />
        </Grid>
      </Grid>
    </SChallengePage>
  );
};

const SChallengePage = styled(Container)`
  min-height: 100vh;
`;

export default ChallengePage;
