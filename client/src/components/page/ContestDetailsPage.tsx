import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Contest } from "../../graphql";
import { Container, Grid } from "@material-ui/core";
import ChallengesContainer from "../challenge/ChallengesContainer";

interface ContestVars {
  id: string;
}

interface ContestData {
  getContest: Contest;
}

const GET_CONTEST = gql`
  query GetContest($id: ID!) {
    getContest(id: $id) {
      challenges {
        id
        title
        content
        level
        points
      }
    }
  }
`;

const ContestDetailsPage: React.FC = (props) => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<ContestData, ContestVars>(
    GET_CONTEST,
    { variables: { id } }
  );

  useEffect(() => {}, []);

  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <SContestDetailsPage>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <ChallengesContainer challenges={data?.getContest.challenges} />
        </Grid>
        <Grid item xs={4}>
          Sort
        </Grid>
      </Grid>
    </SContestDetailsPage>
  );
};

const SContestDetailsPage = styled(Container)``;

export default ContestDetailsPage;
