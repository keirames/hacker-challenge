import React from "react";
import styled from "styled-components";
import ChallengeDetails from "../solvedChallenge/ChallengeDetails";
import ScoreTable from "../solvedChallenge/ScoreTable";
import { gql, useQuery } from "@apollo/client";
import { Challenge } from "../../graphql";
import { useParams } from "react-router-dom";
import { Row, Col } from "antd";

interface Props {
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
      problem
      inputFormat
      outputFormat
      level
      points
      passedUsers {
        id
      }
      contest {
        name
      }
      testCases {
        text
        testString
      }
      testInputs {
        input
      }
      challengeSeed
    }
  }
`;

const ChallengePage: React.FC<Props> = (props) => {
  const { slug } = useParams();

  const { data, loading, error } = useQuery<ChallengeData, ChallengeVars>(
    GET_CHALLENGE,
    { variables: { slug } },
  );

  if (!data?.getChallenge) return null;

  return (
    <SChallengePage style={props.style}>
      <Row gutter={[48, 12]}>
        <Col span={16}>
          <ChallengeDetails challenge={data.getChallenge} />
        </Col>
        <Col span={6}>
          <ScoreTable
            level={data.getChallenge.level}
            points={data.getChallenge.points}
            passedUser={data.getChallenge.passedUsers.length}
          />
        </Col>
      </Row>
    </SChallengePage>
  );
};

const SChallengePage = styled.div`
  width: 70%;
  margin: auto;
  min-height: 100vh;
`;

export default ChallengePage;
