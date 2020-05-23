import React from "react";
import { gql, useQuery } from "@apollo/client";
import ContestBlock from "./ContestBlock";
import { Grid } from "@material-ui/core";
import styled from "styled-components";

export const GET_CONTESTS = gql`
  {
    getContests {
      id
      name
    }
  }
`;

const ContestsContainer: React.FC = (props) => {
  const { data, error, loading } = useQuery(GET_CONTESTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <SContestsContainer>
      <Grid container spacing={5}>
        {data.getContests.map((contest: any) => (
          <Grid item xs={6} key={contest.id}>
            <ContestBlock contest={contest} />
          </Grid>
        ))}
      </Grid>
    </SContestsContainer>
  );
};

const SContestsContainer = styled.div`
  margin-top: 10px;
`;

export default ContestsContainer;
