import React from "react";
import styled from "styled-components";
import { TestCase, TestedResult } from "../../graphql";
import { STheme } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Typography } from "@material-ui/core";

interface IProps {
  testCase: TestCase;
  testedResult: TestedResult | undefined;
}

const TestBlock: React.FC<IProps> = ({ testCase, testedResult }) => {
  const MyIcon: React.FC<{ passed: boolean }> = ({ passed }) => {
    return (
      <SFontAwesomeIcon
        passed={passed}
        icon={["far", passed ? "check-circle" : "times-circle"]}
        size="2x"
      />
    );
  };

  return (
    <STestBlock>
      <SColor passed={testedResult?.passed} />
      {!testedResult ? (
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

const SColor = styled.div<{ passed: boolean | undefined }>`
  align-self: stretch;
  background-color: ${({ theme, passed }) =>
    passed ? theme.palette.common.green : theme.palette.common.red};
  height: 100%;
  width: 8px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const SFontAwesomeIcon = styled(FontAwesomeIcon)<{ passed?: boolean }>`
  color: ${({ theme, passed }) =>
    passed ? theme.palette.common.green : theme.palette.common.red};
`;

export default TestBlock;
