import React from "react";
import { Challenge } from "../../graphql";
import styled from "styled-components";
import { STheme } from "../../theme";
import { Typography, Button } from "@material-ui/core";
import Level from "./Level";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ChallengeBlock: React.FC<{ challenge: Challenge }> = ({ challenge }) => {
  const { slug, title, points, level, isSolved } = challenge;

  const { pathname } = useLocation();

  const SolvedBtn = () => (
    <Button
      variant="contained"
      startIcon={<FontAwesomeIcon icon="check-circle" />}
      disabled
    >
      Solved Challenge
    </Button>
  );

  const UnsolvedBtn = () => (
    <SButton variant="contained" color="primary">
      Solve Challenge
    </SButton>
  );
  // onClick={() => push(`/contests/sort-algorithm/test`)}
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
      <Link to={`${pathname}/${slug}`} style={{ textDecoration: "none" }}>
        {isSolved ? <SolvedBtn /> : <UnsolvedBtn />}
      </Link>
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
