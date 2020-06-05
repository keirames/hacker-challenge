import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { STheme } from "../../theme";
import { Challenge, Answer } from "../../graphql";
import Editor from "./Editor";
import TestTable from "./TestTable";
import { useMutation, gql } from "@apollo/client";
import ProblemContent from "./ProblemContent";
import { useParams } from "react-router-dom";
import Congratulation from "./Congratulation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($challengeSlug: String!, $answer: String!) {
    submitAnswer(challengeSlug: $challengeSlug, answer: $answer) {
      testedResults {
        passed
        time
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
  challengeSlug: string;
  answer: string;
}

const Problem: React.FC<IProps> = (props) => {
  const { challenge, style, ...other } = props;

  const { content, challengeSeed, testCases, testInputs } = challenge;

  const { slug } = useParams();
  const [code, setCode] = useState<string>(challengeSeed);

  const [submitAnswer, { error, data, loading }] = useMutation<
    { submitAnswer: Answer },
    SubmitAnswerInput
  >(SUBMIT_ANSWER);

  const handleCode = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    submitAnswer({
      variables: { challengeSlug: slug, answer: code },
    });
  };

  //TODO: Remove in future
  React.useEffect(() => {
    let answers = localStorage.getItem("answers") as any;
    if (answers) {
      answers = JSON.parse(answers);
      const found = answers.find((a: any) => a.challengeSlug === slug);
      if (found) {
        setCode(found.answer);
      }
    }
  }, [slug]);

  if (error) return <div></div>;

  return (
    <SProblem style={style} {...other}>
      <ProblemContent content={content} />
      <Editor code={code} onCode={handleCode} />
      <SButton
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        startIcon={
          loading ? <FontAwesomeIcon icon="circle-notch" spin /> : null
        }
        disabled={loading}
      >
        Submit Code
      </SButton>
      <Congratulation
        challengeSlug={slug}
        answer={code}
        testedResults={data?.submitAnswer.testedResults || []}
        testCases={testCases}
      />
      <TestTable
        loading={loading}
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
