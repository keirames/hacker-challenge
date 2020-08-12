import React from "react";
import styled from "styled-components";
import { TestedResult, TestCase, TestInput } from "../../graphql";
import TestBlock from "./TestBlock";
import { Row, Col } from "antd";

interface IProps {
  loading: boolean;
  testedResults: TestedResult[];
  testCases: TestCase[];
  testInputs: TestInput[];
}

const TestTable: React.FC<IProps> = ({ loading, testedResults, testCases }) => {
  return (
    <STestTable>
      <Row gutter={[16, 16]}>
        {testCases.map((testCase, index) => (
          <Col span={12} key={index}>
            <TestBlock
              loading={loading}
              testCase={testCase}
              testedResult={testedResults[index]}
            />
          </Col>
        ))}
      </Row>
    </STestTable>
  );
};

const STestTable = styled.div``;

export default TestTable;
