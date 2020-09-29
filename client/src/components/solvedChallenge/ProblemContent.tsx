import React from 'react';
import styled from 'styled-components';
import { Typography } from 'antd';
import { STheme } from '../../theme/theme';

interface Props {
  problem: string;
  inputFormat: string;
  outputFormat: string;
}

const ProblemContent: React.FC<Props> = ({
  problem,
  inputFormat,
  outputFormat,
}) => {
  return (
    <SProblemContent>
      <div dangerouslySetInnerHTML={{ __html: problem }} />
      <STitle>Input Sample</STitle>
      <div dangerouslySetInnerHTML={{ __html: inputFormat }} />
      <STitle>Output Sample</STitle>
      <div dangerouslySetInnerHTML={{ __html: outputFormat }} />
    </SProblemContent>
  );
};

const SProblemContent = styled.div`
  padding: 20px;
  font-size: ${({ theme }: { theme: STheme }) =>
    theme.typography.fontSize.medium};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[1]};
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};

  pre {
    padding: 5px;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGrey};
  }
`;

const STitle = styled.p`
  margin-top: 10px;
  margin-bottom: 0;
  font-size: 1.1rem;
  font-weight: 600;
`;

export default ProblemContent;
