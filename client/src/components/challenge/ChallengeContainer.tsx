import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import ChallengeBlock from "./ChallengeBlock";

const GET_CHALLENGES = gql`
  {
    getChallenges {
      id
      title
      level
      points
    }
  }
`;

const ChallengeContainer: React.FC = (props) => {
  const { data, error, loading } = useQuery(GET_CHALLENGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  return (
    <div>
      {data.getChallenges.map((challenge: any) => (
        <ChallengeBlock key={challenge.id} challenge={challenge} />
      ))}
    </div>
  );
};

export default ChallengeContainer;
