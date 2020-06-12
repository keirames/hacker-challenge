import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { TestCase, TestedResult } from "../../graphql";
import { STheme } from "../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";

interface IProps {
  loading: boolean;
  testCase: TestCase;
  testedResult: TestedResult | undefined;
}

const TestBlock: React.FC<IProps> = ({ loading, testCase, testedResult }) => {
  const [selfLoading, setSelfLoading] = useState(false);

  useEffect(() => {
    let delay: any = null;
    if (loading) setSelfLoading(true);
    else {
      const time = testedResult?.time || 0;
      delay = setTimeout(() => {
        setSelfLoading(false);
      }, time);
    }
    return () => clearTimeout(delay);
  }, [loading, testedResult]);

  const MyIcon: React.FC<{ passed: boolean }> = ({ passed }) => {
    return (
      <SFontAwesomeIcon
        passed={passed ? 1 : 0}
        icon={["far", passed ? "check-circle" : "times-circle"]}
        size="2x"
      />
    );
  };

  return (
    <STestBlock>
      <SColor passed={testedResult?.passed} selfLoading={selfLoading} />
      {selfLoading ? (
        <FontAwesomeIcon icon="circle-notch" spin size="2x" color="#3f51b5" />
      ) : !testedResult ? (
        <FontAwesomeIcon icon={["far", "circle"]} size="2x" />
      ) : (
        <MyIcon passed={testedResult.passed} />
      )}
      <Typography variant="body1">{testCase.text}</Typography>
    </STestBlock>
  );
};

const STestBlock = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  height: 50px;
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

const SColor = styled.div`
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
      : theme.palette.common.red};
  height: 100%;
  width: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)`
  color: ${({ theme, passed }: { theme: STheme; passed: number }) =>
    passed ? theme.palette.common.darkGreen : theme.palette.common.red};
`;

export default TestBlock;
