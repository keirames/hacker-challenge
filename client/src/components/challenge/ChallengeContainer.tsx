import React from 'react';
import styled from 'styled-components';
import { useParams, useRouteMatch } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Row, Col } from 'antd';
import ChallengeDetails from '../solvedChallenge/ChallengeDetails';
import ScoreTable from '../solvedChallenge/ScoreTable';
import { Challenge } from '../../graphql';

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

const ChallengeContainer: React.FC<Props> = (props) => {
  const { params } = useRouteMatch<{ slug: string }>();

  const { data, loading, error } = useQuery<ChallengeData, ChallengeVars>(
    GET_CHALLENGE,
    { variables: { slug: params.slug } }
  );

  if (!data?.getChallenge) return null;

  return (
    <SChallengeContainer style={props.style}>
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
    </SChallengeContainer>
  );
};

const SChallengeContainer = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default ChallengeContainer;
