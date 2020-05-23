import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import { Contest, Challenge, User } from "../../graphql";
import { Container, Grid } from "@material-ui/core";
import ChallengesContainer from "../challenge/ChallengesContainer";
import SortTable from "../challenge/SortTable";

export interface IStatusFilter {
  solved: boolean;
  unsolved: boolean;
}

export interface ILevelFilter {
  easy: false;
  medium: false;
  hard: false;
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

//TODO: Find away to refactore this interfae
interface UserData {
  getMe: User;
}

const GET_ME = gql`
  query GetMe {
    getMe {
      id
      username
      firstname
      lastname
      solvedChallenges {
        id
      }
      likedChallenges {
        id
      }
      totalPoints
    }
  }
`;

const ContestDetailsPage: React.FC = (props) => {
  const { id } = useParams();

  const { data, loading, error } = useQuery<ContestData, ContestVars>(
    GET_CONTEST,
    { variables: { id } }
  );

  const { data: userData } = useQuery<UserData>(GET_ME);

  const [levelFilter, setLevelFilter] = useState<ILevelFilter>({
    easy: false,
    medium: false,
    hard: false,
  });

  const [statusFilter, setStatusFilter] = useState<IStatusFilter>({
    solved: false,
    unsolved: false,
  });

  useEffect(() => {}, []);

  const handleChangeLevelFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLevelFilter({
      ...levelFilter,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  const handleChangeStatusFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStatusFilter({
      ...statusFilter,
      [e.currentTarget.name]: e.currentTarget.checked,
    });
  };

  //* Get data after sort
  const getPageData = (): Challenge[] => {
    const levelChoices: string[] = [];
    const statusChoices: string[] = [];

    for (let key in levelFilter) {
      if (levelFilter[key as keyof typeof levelFilter]) levelChoices.push(key);
    }
    for (let key in statusFilter) {
      if (statusFilter[key as keyof typeof statusFilter])
        statusChoices.push(key);
    }

    // Level filter
    let sortedChallenges = data?.getContest.challenges.filter((c) => {
      return levelChoices.length === 0 ? true : levelChoices.includes(c.level);
    });

    // Status filter
    const solvedChallengesId: string[] = userData
      ? userData.getMe.solvedChallenges.map((c) => c.id)
      : [];
    sortedChallenges = sortedChallenges?.filter((c) => {
      if (statusChoices.length === 0) return true;
      if (statusChoices.length === Object.keys(statusFilter).length)
        return true;

      if (statusChoices.includes("solved"))
        return solvedChallengesId.includes(c.id) ? true : false;

      if (statusChoices.includes("unsolved"))
        return solvedChallengesId.includes(c.id) ? false : true;
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
        <Grid item xs={2}>
          <SortTable
            levelFilter={levelFilter}
            statusFilter={statusFilter}
            onChangeLevelFilter={handleChangeLevelFilter}
            onChangeStatusFilter={handleChangeStatusFilter}
          />
        </Grid>
      </Grid>
    </SContestDetailsPage>
  );
};

const SContestDetailsPage = styled(Container)`
  margin-top: 20px;
`;

export default ContestDetailsPage;
