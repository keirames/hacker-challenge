import React from 'react';
import styled from 'styled-components';
import { STheme } from '../../theme/theme';
import Level from '../challenge/Level';

interface Props {
  style?: React.CSSProperties;
  level: string;
  points: number;
  passedUser: number;
}

const ScoreTable: React.FC<Props> = (props) => {
  const { style, level, points, passedUser } = props;

  return (
    <SSCoreTable style={style}>
      <div>
        Level <Level level={level} />
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

export default ScoreTable;
