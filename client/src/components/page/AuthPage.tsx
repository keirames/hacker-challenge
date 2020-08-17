import React from 'react';
import styled from 'styled-components';
import LoginForm from '../auth/LoginForm';
import RegisterForm from '../auth/RegisterForm';
import SocialPanel from '../auth/SocialPanel';

interface Props {
  type: 'signIn' | 'signUp';
}

const AuthPage: React.FC<Props> = (props) => {
  const { type = 'signIn' } = props;

  return (
    <SAuth>
      {type === 'signIn' && (
        <div style={{ display: 'flex' }}>
          <LoginForm />
          <SocialPanel />
        </div>
      )}
      {type === 'signUp' && <RegisterForm />}
      <img src="./images/hacker_mindset.svg" alt="" />
    </SAuth>
  );
};

const SAuth = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default AuthPage;
