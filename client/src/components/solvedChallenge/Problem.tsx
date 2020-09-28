import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Space } from 'antd';
import { Challenge, TestResult } from '../../graphql';
import Editor from './Editor';
import TestTable from './TestTable';
import ProblemContent from './ProblemContent';
import Congratulation from './Congratulation';
import MyButton from '../common/MyButton';
import Console from './Console';

const SUBMIT_ANSWER = gql`
  mutation SubmitAnswer($submitAnswerInput: SubmitAnswerInput!) {
    submitAnswer(submitAnswerInput: $submitAnswerInput) {
      text
      testString
      pass
      err
      message
      stack
      log
    }
  }
`;

interface Props {
  style?: React.CSSProperties;
  challenge: Challenge;
}

interface SubmitAnswerInput {
  submitAnswerInput: {
    userId: number;
    challengeId: number;
    answer: string;
  };
}

const Problem: React.FC<Props> = (props) => {
  const { challenge, style, ...other } = props;

  const {
    id,
    problem,
    inputFormat,
    outputFormat,
    challengeSeed,
    testCases,
    testInputs,
  } = challenge;

  const { slug } = useParams<{ slug: string }>();
  const [code, setCode] = useState<string>(challengeSeed);

  const [submitAnswer, { error, data, loading }] = useMutation<
    { submitAnswer: TestResult[] },
    SubmitAnswerInput
  >(SUBMIT_ANSWER);

  const handleCode = (value: string) => {
    setCode(value);
  };

  const handleSubmit = () => {
    submitAnswer({
      variables: {
        submitAnswerInput: { userId: 1, challengeId: id, answer: code },
      },
    });
  };

  // TODO: Remove in future
  React.useEffect(() => {
    // let answers = localStorage.getItem("answers") as any;
    // if (answers) {
    //   answers = JSON.parse(answers);
    //   const found = answers.find((a: any) => a.challengeSlug === slug);
    //   if (found) {
    //     setCode(found.answer);
    //   }
    // }
  }, [slug]);

  if (error) return <div />;
  console.log(data?.submitAnswer);
  return (
    <SProblem style={style} {...other}>
      <ProblemContent
        problem={problem}
        inputFormat={inputFormat}
        outputFormat={outputFormat}
      />
      <Editor code={code} onCode={handleCode} />
      <Console content={data?.submitAnswer[0].log || ''} />
      <SSpace size="middle">
        <MyButton color="primary" type="ghost" size="middle">
          Run Code
        </MyButton>
        <MyButton
          color="secondary"
          type="primary"
          size="middle"
          loading={loading}
          onClick={handleSubmit}
        >
          Submit Code
        </MyButton>
      </SSpace>
      {/* <Congratulation
        challengeSlug={slug}
        answer={code}
        testedResults={data?.submitAnswer.testedResults || []}
        testCases={testCases}
      /> */}
      <TestTable
        loading={loading}
        testResults={data?.submitAnswer || []}
        testCases={testCases}
        testInputs={testInputs}
      />
    </SProblem>
  );
};

const SProblem = styled.div``;

const SSpace = styled(Space)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin: 10px;
`;

export default Problem;
