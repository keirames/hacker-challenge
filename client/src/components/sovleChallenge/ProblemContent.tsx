import React from "react";
import { Content } from "../../graphql";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { STheme } from "../../theme/theme";

const ProblemContent: React.FC<{ content: Content }> = ({ content }) => {
  return (
    <SProblemContent>
      <div dangerouslySetInnerHTML={{ __html: content.problem }} />
      <Typography variant="subtitle2">Input Sample</Typography>
      <div dangerouslySetInnerHTML={{ __html: content.inputSample }} />
      <Typography variant="subtitle2">Output Sample</Typography>
      <div dangerouslySetInnerHTML={{ __html: content.outputSample }} />
    </SProblemContent>
  );
};

const SProblemContent = styled.div`
  margin: 0 0 20px 0;
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  padding: 20px;
  font-size: ${({ theme }: { theme: STheme }) =>
    theme.typography.fontSize.medium};
  font-weight: normal;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};

  pre {
    padding: 10px;
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.lightGrey};
  }
`;

export default ProblemContent;
