import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import { TestResult, TestCase, TestInput } from '../../graphql';
import TestBlock from './TestBlock';

interface IProps {
  loading: boolean;
  testResults: TestResult[];
  testCases: TestCase[];
  testInputs: TestInput[];
}

const TestTable: React.FC<IProps> = ({ loading, testResults, testCases }) => {
  return (
    <STestTable>
      <Row gutter={[16, 16]}>
        {testCases.map((testCase, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <Col span={24} key={index}>
            <TestBlock
              loading={loading}
              testCase={testCase}
              testResult={testResults[index]}
            />
          </Col>
        ))}
      </Row>
    </STestTable>
  );
};

const STestTable = styled.div``;

export default TestTable;
