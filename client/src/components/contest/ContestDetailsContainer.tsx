import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { Contest, Challenge } from '../../graphql';
import ChallengesList from '../challenge/ChallengesList';
import SortTable from '../challenge/SortTable';
import { solvedChallengesIdVar } from '../../graphql/localState';

export interface StatusFilter {
  solved: boolean;
  unsolved: boolean;
}

export interface LevelFilter {
  easy: boolean;
  medium: boolean;
  hard: boolean;
}

interface ContestVars {
  slug: string;
}

interface ContestData {
  getContest: Contest;
}

const GET_CONTEST = gql`
  query GetContest($slug: String!) {
    getContest(slug: $slug) {
      challenges {
        id
        title
        slug
        level
        points
      }
    }
  }
`;

interface GetMe {
  solvedChallenges: {
    id: number;
  }[];
}

interface GetMeData {
  getMe: GetMe;
}

const GET_ME = gql`
  query GetMe {
    getMe {
      solvedChallenges {
        id
      }
    }
  }
`;

const ContestDetailsContainer: React.FC = (props) => {
  const { slug } = useParams<{ slug: string }>();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [levelFilter, setLevelFilter] = useState<LevelFilter>({
    easy: true,
    medium: true,
    hard: true,
  });
  const [statusFilter, setStatusFilter] = useState<StatusFilter>({
    solved: true,
    unsolved: true,
  });

  const { data, loading, error } = useQuery<ContestData, ContestVars>(
    GET_CONTEST,
    { variables: { slug } }
  );
  const { data: userData } = useQuery<GetMeData>(GET_ME);

  useEffect(() => {
    if (userData) {
      const solvedChallenges = userData.getMe.solvedChallenges.map(
        (sc) => sc.id
      );
      solvedChallengesIdVar(solvedChallenges);
    }
  }, [userData]);

  useEffect(() => {
    if (data) {
      let tempChallenges = [...data.getContest.challenges];
      tempChallenges = tempChallenges.map((c) =>
        solvedChallengesIdVar().includes(c.id) ? { ...c, isSolved: true } : c
      );
      setChallenges(tempChallenges);
    }
  }, [data]);

  const handleChangeLevelFilter = (checkedValue: CheckboxValueType[]) => {
    const tempLevelFilter = { ...levelFilter };
    for (const key in levelFilter) {
      if (Object.prototype.hasOwnProperty.call(levelFilter, key)) {
        const flag = checkedValue.includes(key);
        if (flag) tempLevelFilter[key as keyof typeof levelFilter] = true;
        else tempLevelFilter[key as keyof typeof levelFilter] = false;
      }
    }

    setLevelFilter({
      ...tempLevelFilter,
    });
  };

  const handleChangeStatusFilter = (checkedValue: CheckboxValueType[]) => {
    const tempStatusFilter = { ...statusFilter };
    for (const key in statusFilter) {
      if (Object.prototype.hasOwnProperty.call(levelFilter, key)) {
        const flag = checkedValue.includes(key);
        if (flag) tempStatusFilter[key as keyof typeof statusFilter] = true;
        else tempStatusFilter[key as keyof typeof statusFilter] = false;
      }
    }

    setStatusFilter({
      ...tempStatusFilter,
    });
  };

  // Get data after sort
  const getPageData = (): Challenge[] => {
    const levelChoices: string[] = [];
    const statusChoices: string[] = [];

    for (const key in levelFilter) {
      if (levelFilter[key as keyof typeof levelFilter]) levelChoices.push(key);
    }
    for (const key in statusFilter) {
      if (statusFilter[key as keyof typeof statusFilter])
        statusChoices.push(key);
    }

    // Level filter
    let sortedChallenges = challenges.filter((c) => {
      return levelChoices.length === 0 ? true : levelChoices.includes(c.level);
    });

    // Status filter
    sortedChallenges = sortedChallenges.filter((c) => {
      if (statusChoices.length === 0) return true;
      if (statusChoices.length === Object.keys(statusFilter).length)
        return true;

      return statusChoices.includes('solved') ? c.isSolved : !c.isSolved;
    });

    return sortedChallenges || [];
  };

  const sortedChallenges = getPageData();

  // TODO: More fancy client UI/UX
  if (loading) return <div>Loading</div>;
  if (error) return <div>Error</div>;

  return (
    <SContestDetailsContainer>
      <Row gutter={[48, 0]} justify="space-around">
        <Col span={16}>
          <ChallengesList challenges={sortedChallenges} />
        </Col>
        <Col span={5}>
          <SortTable
            onChangeLevelFilter={handleChangeLevelFilter}
            onChangeStatusFilter={handleChangeStatusFilter}
          />
        </Col>
      </Row>
    </SContestDetailsContainer>
  );
};

const SContestDetailsContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export default ContestDetailsContainer;
