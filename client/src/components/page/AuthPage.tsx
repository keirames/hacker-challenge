import React from 'react';
import styled from 'styled-components';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
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
          <SignInForm />
          <SocialPanel />
        </div>
      )}
      {type === 'signUp' && <SignUpForm />}
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
