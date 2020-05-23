import React from "react";
import { Challenge } from "../../graphql";
import styled from "styled-components";
import { STheme } from "../../theme";
import { Typography, Button } from "@material-ui/core";
import Level from "./Level";
import { Link, useHistory } from "react-router-dom";

const ChallengeBlock: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { id, title, points, level } = challenge;

  const { push } = useHistory();

  return (
    <SChallengeBlock>
      <div>
        <Typography variant="h5" style={{ marginBottom: "5px" }}>
          {title}
        </Typography>
        <Level level={level} style={{ display: "inline-block" }} />
        <Typography
          variant="body2"
          style={{ display: "inline-block", fontWeight: "lighter" }}
        >
          , Max Score: {points}
        </Typography>
      </div>
      <SButton
        variant="contained"
        color="primary"
        onClick={() => push(`/challenges/${id}`)}
      >
        Solve Challenge
      </SButton>
    </SChallengeBlock>
  );
};

const SChallengeBlock = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
`;

const SButton = styled(Button)`
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.black};
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.green};

  &:hover {
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGreen};
  }
`;

export default ChallengeBlock;
