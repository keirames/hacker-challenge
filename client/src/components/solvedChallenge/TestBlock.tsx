import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { TestCase, TestResult } from '../../graphql';
import { STheme } from '../../theme/theme';

interface Props {
  loading: boolean;
  testCase: TestCase;
  testResult?: TestResult;
}

const TestBlock: React.FC<Props> = ({ loading, testCase, testResult }) => {
  const [selfLoading, setSelfLoading] = useState<boolean>(loading);

  useEffect(() => {
    if (loading) setSelfLoading(true);
    else setSelfLoading(false);
  }, [loading, testResult]);

  const MyIcon: React.FC<{ passed: boolean }> = ({ passed }) => {
    return (
      <SFontAwesomeIcon
        passed={passed ? 1 : 0}
        icon={['far', passed ? 'check-circle' : 'times-circle']}
        size="2x"
      />
    );
  };

  const renderIcon = (): JSX.Element => {
    if (selfLoading)
      return (
        <FontAwesomeIcon icon="circle-notch" spin size="2x" color="#3f51b5" />
      );

    if (!testResult)
      return <FontAwesomeIcon icon={['far', 'circle']} size="2x" />;

    return <MyIcon passed={testResult.pass} />;
  };

  return (
    <STestBlock>
      <SColorBar passed={testResult?.pass} selfLoading={selfLoading} />
      {renderIcon()}
      <STestString>
        <div dangerouslySetInnerHTML={{ __html: testCase.text }} />
      </STestString>
    </STestBlock>
  );
};

const STestBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  min-height: 50px;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
  border-bottom-left-radius: 10px;
  border-top-left-radius: 10px;
  cursor: pointer;
  box-shadow: ${({ theme }: { theme: STheme }) => theme.shadows[2]};
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.common.white};

  & > * {
    margin-right: 10px;
  }
`;

const SColorBar = styled.span`
  align-self: stretch;
  background-color: ${({
    theme,
    passed,
    selfLoading,
  }: {
    theme: STheme;
    passed: boolean | undefined;
    selfLoading: boolean;
  }) =>
    selfLoading || passed === undefined
      ? theme.palette.common.blue
      : passed
      ? theme.palette.common.darkGreen
      : theme.palette.common.lightRed};
  /* height: 100%; */
  width: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const STestString = styled.div`
  width: 90%;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, passed }: { theme: STheme; passed: number }) =>
    passed ? theme.palette.common.darkGreen : theme.palette.common.lightRed};
`;

export default TestBlock;
