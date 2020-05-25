import React from "react";
import { Challenge } from "../../graphql";
import { Typography, Paper } from "@material-ui/core";
import styled from "styled-components";
import { STheme } from "../../theme";
import MonacoEditor from "react-monaco-editor";

interface IProps {
  style?: React.CSSProperties;
  challenge: Challenge;
}

const ChallengeDetails: React.FC<IProps> = (props) => {
  const { title, content, challengeSeed } = props.challenge;

  return (
    <div style={props.style}>
      <SHeader>
        Breedcum
        <Typography variant="h4">{title}</Typography>
      </SHeader>
      <SContent>{content}</SContent>
      <SSovle>{challengeSeed}</SSovle>
    </div>
  );
};

const SHeader = styled.div`
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  padding: 20px;
`;

const SContent = styled.div`
  margin-top: 10px;
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  padding: 20px;
`;

const SSovle = styled.div``;

export default ChallengeDetails;
