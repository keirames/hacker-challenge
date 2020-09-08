import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import SocialPanel from '../auth/SocialPanel';
import Success from '../auth/Success';

const AuthPage: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <SAuthPage>
      <Switch>
        <Route exact path={`${path}/signin`}>
          <div style={{ display: 'flex' }}>
            <SignInForm />
            <SocialPanel />
          </div>
        </Route>
        <Route exact path={`${path}/signup`} component={SignUpForm} />
        <Route exact path={`${path}/success`} component={Success} />
        <Redirect to="/" />
      </Switch>
      <img src="../images/hacker_mindset.svg" alt="A person" />
    </SAuthPage>
  );
};

const SAuthPage = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default AuthPage;
