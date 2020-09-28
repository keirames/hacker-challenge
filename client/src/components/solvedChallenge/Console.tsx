import React from 'react';
import styled from 'styled-components';

const Console: React.FC<{ content: string }> = ({ content }) => {
  return (
    <SConsole>
      <pre>
        ** Your test output will go here ** {'\n'}
        {content}
      </pre>
    </SConsole>
  );
};

const SConsole = styled.div`
  padding: 5px;
  margin-top: 10px;
  width: 100%;
  min-height: 200px;
  background-color: white;
  overflow-y: scroll;
`;

export default Console;
