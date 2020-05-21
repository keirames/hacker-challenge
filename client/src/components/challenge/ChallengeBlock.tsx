import React from "react";

type Props = {
  challenge: {
    id: string;
    title: string;
    level: string;
    point: number;
  };
};

const ChallengeBlock: React.FC<Props> = ({ challenge }) => {
  return <div>{challenge.title}</div>;
};

export default ChallengeBlock;
