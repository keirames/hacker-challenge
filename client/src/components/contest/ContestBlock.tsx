import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme";
import { Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";

type Props = {
  contest: {
    id: string;
    name: string;
  };
};

const CategoryBlock: React.FC<Props> = ({ contest }) => {
  const { id, name } = contest;

  return (
    <Link
      to={`contests/${id}`}
      style={{ textDecoration: "none", color: "black" }}
    >
      <SContestBlock>
        <Typography variant="h5" style={{ fontWeight: "bold" }}>
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci,
          veritatis. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Accusantium, quasi?
        </Typography>
        <SButton variant="contained">Get Start</SButton>
      </SContestBlock>
    </Link>
  );
};

const SContestBlock = styled.div`
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[3]};
  padding: 30px;
  cursor: pointer;

  & > * {
    margin-top: 10px;
  }
`;

const SButton = styled(Button)`
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.green};

  &:hover {
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.darkGreen};
  }
`;

export default CategoryBlock;
