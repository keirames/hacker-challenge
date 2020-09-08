import React from 'react';
import styled from 'styled-components';
import { STheme } from '../../theme/theme';

interface Props {
  style?: React.CSSProperties;
  level: string;
}

const Level: React.FC<Props> = ({ style, level }) => {
  return (
    <SLevel style={style} level={level}>
      {level}
    </SLevel>
  );
};

const SLevel = styled.div<Props>`
  text-transform: capitalize;
  color: ${({ theme, level }: { theme: STheme; level: string }) => {
    if (level === 'easy') return theme.palette.common.darkGreen;
    if (level === 'medium') return theme.palette.common.darkGold;
    return theme.palette.common.lightCrimson;
  }};
`;

export default Level;
