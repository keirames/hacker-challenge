import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import SocialPanel from '../auth/SocialPanel';
import ForgotPassword from '../auth/ForgotPassword';
import ResetPasswordContainer from '../auth/ResetPasswordContainer';
import ConfirmationContainer from '../auth/ConfirmationContainer';

const AuthPage: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <SAuthPage>
      <Switch>
        <Route exact path={`${path}/signin`}>
          <SAuthentication>
            <div style={{ display: 'flex' }}>
              <SignInForm />
              <SocialPanel />
            </div>
            <img src="../images/hacker_mindset.svg" alt="A person" />
          </SAuthentication>
        </Route>
        <Route exact path={`${path}/signup`}>
          <SAuthentication>
            <SignUpForm />
            <img src="../images/hacker_mindset.svg" alt="A person" />
          </SAuthentication>
        </Route>
        <Route
          exact
          path={`${path}/forgot-password`}
          component={ForgotPassword}
        />
        <Route
          exact
          path={`${path}/confirmation/:confirmationToken`}
          component={ConfirmationContainer}
        />
        <Route
          exact
          path={`${path}/reset-password/:resetPasswordToken`}
          component={ResetPasswordContainer}
        />
        <Redirect to="/" />
      </Switch>
    </SAuthPage>
  );
};

const SAuthPage = styled.div``;

const SAuthentication = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default AuthPage;
