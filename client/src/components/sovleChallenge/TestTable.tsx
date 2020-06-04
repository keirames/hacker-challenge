import React from "react";
import styled from "styled-components";
import { TestedResult, TestCase } from "../../graphql";
import TestBlock from "./TestBlock";
import { Grid } from "@material-ui/core";

interface IProps {
  loading: boolean;
  testedResults: TestedResult[];
  testCases: TestCase[];
  testInputs: string[];
}

const TestTable: React.FC<IProps> = ({ loading, testedResults, testCases }) => {
  return (
    <STestTable>
      <Grid container spacing={2}>
        {testCases.map((testCase, index) => (
          <Grid item xs={6} key={index}>
            <TestBlock
              loading={loading}
              testCase={testCase}
              testedResult={testedResults[index]}
            />
          </Grid>
        ))}
      </Grid>
    </STestTable>
  );
};

const STestTable = styled.div``;

export default TestTable;
