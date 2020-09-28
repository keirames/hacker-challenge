import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';
import styled from 'styled-components';
import { TestResult, TestCase } from '../../graphql';
import { STheme } from '../../theme/theme';
import MyButton from '../common/MyButton';

interface IProps {
  challengeSlug: string;
  answer: string;
  testedResults: TestResult[];
  testCases: TestCase[];
}

const Congratulation: React.FC<IProps> = ({
  challengeSlug,
  answer,
  testedResults,
  testCases,
}) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // if (testedResults.filter((r) => r.passed).length === testCases.length) {
    //   const longestTime: number = testedResults
    //     .map((t) => t.time)
    //     .reduce((a, b) => Math.max(a, b), 0);
    //   setTimeout(() => {
    //     setVisible(true);
    //   }, longestTime);
    // } else setVisible(false);
  }, [testCases.length, testedResults]);

  if (!visible) return null;

  if (visible) {
    const answers: { answer: string; challengeSlug: string }[] =
      JSON.parse(localStorage.getItem('answers') as any) || [];

    const found = answers.find((a) => a.challengeSlug === challengeSlug);
    if (found) found.answer = answer;
    else answers.push({ answer, challengeSlug });

    localStorage.setItem('answers', JSON.stringify(answers));
  }

  return (
    <SCongrats>
      <div>
        <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
          Congratulations!
        </Typography.Title>
        <Typography.Text style={{ fontWeight: 'lighter' }}>
          You solved this challenge. Would you like to challenge your friends?
        </Typography.Text>
      </div>
      <Link to="/contests" style={{ textDecoration: 'none' }}>
        <MyButton color="secondary" type="primary">
          Solve more challenge
        </MyButton>
      </Link>
    </SCongrats>
  );
};

const SCongrats = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  overflow: hidden;
  min-height: 50px;
  background: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.darkGreen};
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.white};
  margin: 10px 0 20px 0;
  padding: 20px;
`;

export default Congratulation;
