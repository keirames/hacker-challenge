import React from "react";

type ContainerProps = {
  challenge: {
    id: string;
    title: string;
    level: string;
    point: number;
  };
};

const ChallengeBlock: React.FC<ContainerProps> = ({ challenge }) => {
  return <div>{challenge.title}</div>;
};

export default ChallengeBlock;
