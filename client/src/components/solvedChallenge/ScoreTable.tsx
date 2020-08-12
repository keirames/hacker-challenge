import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";

interface IProps {
  style?: React.CSSProperties;
  level: string;
  points: number;
  passedUser: number;
}

const ScoreTable: React.FC<IProps> = (props) => {
  const { style, level, points, passedUser } = props;

  return (
    <SSCoreTable style={style}>
      <div>
        Level <SLevel level={level}>{level}</SLevel>
      </div>
      <div>
        Points <span>{points}</span>
      </div>
      <div>
        Passed user <span>{passedUser}</span>
      </div>
    </SSCoreTable>
  );
};

const SSCoreTable = styled.div`
  margin-top: 40px;
  padding: 10px;
  width: 100%;
  min-height: 100px;
  border: ${({ theme }: { theme: STheme }) =>
    `1px solid ${theme.palette.common.lightGrey}`};

  & > div {
    color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkCyan};
    text-transform: capitalize;
    margin: 0 0 5px 0;

    & > span {
      color: ${({ theme }: { theme: STheme }) => theme.palette.common.blue};
      float: right;
    }
  }
`;

const SLevel = styled.span<{ level: string }>`
  color: ${({ theme, level }) =>
    level === "hard"
      ? theme.palette.common.red
      : level === "medium"
      ? theme.palette.common.orange
      : theme.palette.common.green} !important;
`;

export default ScoreTable;
