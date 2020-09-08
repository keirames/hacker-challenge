import React from 'react';
import styled from 'styled-components';
import { STheme } from '../../theme/theme';

interface Props {
  level: string;
}

const Level: React.FC<Props> = ({ level }) => {
  if (level === 'hard') return <SHard>Hard</SHard>;
  if (level === 'medium') return <SMedium>Medium</SMedium>;
  return <SEasy>Easy</SEasy>;
};

const SHard = styled.span`
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkCrimson};
`;

const SMedium = styled.span`
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.orange};
`;

const SEasy = styled.span`
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.darkGreen};
`;

export default Level;
