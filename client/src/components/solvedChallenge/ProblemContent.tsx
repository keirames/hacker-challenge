import React from "react";
import styled from "styled-components";
import { STheme } from "../../theme/theme";
import { Typography } from "antd";

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
      <Typography.Title level={4}>Input Sample</Typography.Title>
      <div dangerouslySetInnerHTML={{ __html: inputFormat }} />
      <Typography.Title level={4}>Output Sample</Typography.Title>
      <div dangerouslySetInnerHTML={{ __html: outputFormat }} />
    </SProblemContent>
  );
};

const SProblemContent = styled.div`
  margin: 0 0 20px 0;
  padding: 20px;
  font-size: ${({ theme }: { theme: STheme }) =>
    theme.typography.fontSize.medium};
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  font-weight: normal;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};

  pre {
    padding: 5px;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGrey};
  }
`;

export default ProblemContent;
