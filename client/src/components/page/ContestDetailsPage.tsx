import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { Contest, Challenge } from "../../graphql";
import { Container, Grid } from "@material-ui/core";
import ChallengesContainer from "../challenge/ChallengesContainer";
import SortTable from "../challenge/SortTable";
import { GET_USER } from "../../mutations";

export interface ISortTypes {
  easy: boolean;
  medium: boolean;
  hard: boolean;
}

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

  const { data: userData } = useQuery(GET_USER);
  console.log(userData);

  const [sortTypes, setSortTypes] = useState<ISortTypes>({
    easy: false,
    medium: false,
    hard: false,
  });

  useEffect(() => {}, []);

  const handleChangeSortTypes = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortTypes({
      ...sortTypes,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  //* Get data after sort
  const getPageData = (): Challenge[] => {
    const sortChoice: string[] = [];
    for (let key in sortTypes) {
      if (sortTypes[key as keyof typeof sortTypes] === true)
        sortChoice.push(key);
    }

    const sortedChallenges = data?.getContest.challenges.filter((challenge) => {
      return sortChoice.length === 0
        ? true
        : sortChoice.includes(challenge.level);
    });
    return sortedChallenges ? sortedChallenges : [];
  };

  const sortedChallenges = getPageData();

  // TODO: More fancy client UI/UX
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <SContestDetailsPage>
      <Grid container spacing={5}>
        <Grid item xs={8}>
          <ChallengesContainer challenges={sortedChallenges} />
        </Grid>
        <Grid item xs={4}>
          <SortTable
            onChangeSortTypes={handleChangeSortTypes}
            sortType={sortTypes}
          />
        </Grid>
      </Grid>
    </SContestDetailsPage>
  );
};

const SContestDetailsPage = styled(Container)``;

export default ContestDetailsPage;
