import React from 'react';
import styled from 'styled-components';

interface Props {
  level: string;
}

const Level: React.FC<Props> = ({ level }) => {
  if (level === 'hard') return <SHard>Hard</SHard>;
  if (level === 'medium') return <SMedium>Medium</SMedium>;
  return <SEasy>Easy</SEasy>;
};

const SHard = styled.span`
  color: ${({ theme }) => theme.paletter.common.red};
`;

const SMedium = styled.span`
  color: ${({ theme }) => theme.paletter.common.orange};
`;

const SEasy = styled.span`
  color: ${({ theme }) => theme.paletter.common.green};
`;

export default Level;
