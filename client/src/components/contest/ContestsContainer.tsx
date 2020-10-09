import React from 'react';
import { gql, useQuery } from '@apollo/client';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import ContestBlock from './ContestBlock';

export const GET_CONTESTS = gql`
  query GetContests {
    getContests {
      id
      name
      slug
    }
  }
`;

const ContestsContainer: React.FC = (props) => {
  const { data, error, loading } = useQuery(GET_CONTESTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  if (!data) return <div>not thing</div>;

  return (
    <SContestsContainer>
      <Row gutter={[48, 48]}>
        {data.getContests.map((contest: any) => (
          <Col span={12} key={contest.id}>
            <ContestBlock contest={contest} />
          </Col>
        ))}
      </Row>
    </SContestsContainer>
  );
};

const SContestsContainer = styled.div`
  margin-top: 10px;
`;

export default ContestsContainer;
