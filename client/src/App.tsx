import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import MainPage from './components/pages/MainPage';
import AuthPage from './components/pages/AuthPage';
import { MyEditor } from './MyEditor';
import { STheme } from './theme/theme';
import SettingsPage from './components/pages/SettingsPage';
import SplashScreen from './components/pages/SplashScreen';
import { getCurrentUser, removeToken } from './services/authService';
import { isSignedInVar } from './graphql/localState';

interface GetMe {
  id: number;
  totalPoints: number;
  firstName: string;
  lastName: string;
}

interface GetMeData {
  getMe: GetMe;
}

const GET_ME = gql`
  query GetMe {
    getMe {
      id
      totalPoints
      firstName
      lastName
    }
  }
`;

const App: React.FC = () => {
  const { data, error } = useQuery<GetMeData>(GET_ME);

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const jwt = getCurrentUser();
    if (jwt) {
      isSignedInVar(true);
    } else {
      isSignedInVar(false);
    }
  }, []);

  useEffect(() => {
    if (isSignedInVar()) {
      const isUnauthorized =
        error?.graphQLErrors[0].extensions?.exception.response.statusCode ===
        401;
      if (isUnauthorized) {
        removeToken();
        setIsReady(true);
      }

      if (data) setIsReady(true);
    } else setIsReady(true);
  }, [data, error]);

  if (!isReady)
    return (
      <SApp>
        <SplashScreen />
      </SApp>
    );

  return (
    <SApp>
      <Switch>
        <Route path="/auth" component={AuthPage} />
        <Route path="/contests" component={MainPage} />
        <Route path="/settings" component={SettingsPage} />
        <Route path="/rich" component={MyEditor} />
        <Redirect exact from="/" to="/contests" />
        <Redirect to="/contests" />
      </Switch>
    </SApp>
  );
};

export default App;

const SApp = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  min-height: 100vh;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.whitesmoke};
`;
