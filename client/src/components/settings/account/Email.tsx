import React from 'react';
import { Input } from 'antd';
import styled from 'styled-components';
import { STheme } from '../../../theme/theme';

interface Props {
  email: string | null;
  children?: React.ReactNode;
}

const Email: React.FC<Props> = ({ email, children }) => {
  return (
    <div>
      {children}
      {email ? (
        <Input value={email} disabled style={{ width: '50%' }} />
      ) : (
        <SEmailNotFound>
          You don't have email. This will happend when you sign in with social
          providers.
        </SEmailNotFound>
      )}
    </div>
  );
};

const SEmailNotFound = styled.p`
  color: ${({ theme }: { theme: STheme }) => theme.palette.common.lightRed};
  margin: 0;
`;

export default Email;
