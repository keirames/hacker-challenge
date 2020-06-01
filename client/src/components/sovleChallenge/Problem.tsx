import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { STheme } from "../../theme";
import { Challenge, Answer } from "../../graphql";
import Editor from "./Editor";
import ProblemContent from "./Content";
import TestTable from "./TestTable";
import { useMutation, gql } from "@apollo/client";

const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($challengeId: ID!, $answer: String!) {
    submitAnswer(challengeId: $challengeId, answer: $answer) {
      testedResults {
        passed
        assert {
          message
          actual
          expected
        }
      }
    }
  }
`;

interface IProps {
  style?: React.CSSProperties;
  challenge: Challenge;
}

interface SubmitAnswerInput {
  challengeId: string;
  answer: string;
}

const Problem: React.FC<IProps> = (props) => {
  const { challenge, style, ...other } = props;

  const { content, challengeSeed, testCases, testInputs } = challenge;

  const [code, setCode] = useState<string>(challengeSeed);

  const [submitAnswer, { error, data }] = useMutation<
    { submitAnswer: Answer },
    SubmitAnswerInput
  >(SUBMIT_ANSWER);

  const handleCode = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    submitAnswer({
      variables: { challengeId: "5ecdd0871e38df1562b67a95", answer: code },
    });
  };

  if (error) return <div></div>;

  return (
    <SProblem style={style} {...other}>
      <ProblemContent content={content} />
      <Editor code={code} onCode={handleCode} />
      <SButton variant="contained" color="primary" onClick={handleSubmit}>
        Submit Code
      </SButton>
      <TestTable
        testedResults={data?.submitAnswer.testedResults || []}
        testCases={testCases}
        testInputs={testInputs}
      />
    </SProblem>
  );
};

const SProblem = styled.div``;

const SButton = styled(Button)`
  margin: 20px;
  float: right;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.green};
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.black};

  &:hover {
    background-color: ${({ theme }: { theme: STheme }) =>
      theme.palette.common.green};
  }
`;

export default Problem;
