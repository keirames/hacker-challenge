import React, { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import MainPage from './components/page/MainPage';
import AuthPage from './components/page/AuthPage';
import { GET_USER_CLIENT } from './mutations';
import { getCurrentUser } from './services/authService';
import NavBar from './components/navBar/NavBar';
import ContestDetailsPage from './components/page/ContestDetailsPage';
import ChallengePage from './components/page/ChallengePage';
import { MyEditor } from './MyEditor';
import { STheme } from './theme/theme';
import Footer from './components/footer/Footer';

const App: React.FC = () => {
  const { client } = useQuery(GET_USER_CLIENT);

  useEffect(() => {
    const user = getCurrentUser();
    client.writeQuery({
      query: GET_USER_CLIENT,
      data: { user },
    });
  }, [client]);

  /* eslint-disable react/no-unused-prop-types */
  const NavRoute = useCallback(
    ({
      exact,
      path,
      component: Component,
    }: {
      exact: boolean;
      path: string;
      component: React.FC;
    }) => (
      <Route exact={exact} path={path}>
        <NavBar />
        <Component />
        <Route
          exact
          path="/signup"
          component={() => <AuthPage type="signUp" />}
        />
        <Footer />
      </Route>
    ),
    []
  );

  const ProtectedRoute = ({
    component: Component,
    ...rest
  }: {
    component: React.FC;
  }) => (
    <Route {...rest}>
      {!getCurrentUser() ? (
        <Redirect to={{ pathname: '/signin' }} />
      ) : (
        <Component />
      )}
    </Route>
  );

  return (
    <SApp>
      <Switch>
        <Route
          exact
          path="/signin"
          component={() => <AuthPage type="signIn" />}
        />
        <Route
          exact
          path="/signup"
          component={() => <AuthPage type="signUp" />}
        />
        <NavRoute exact path="/contests" component={MainPage} />
        <NavRoute exact path="/contests/:slug" component={ContestDetailsPage} />
        {/* <NavRoute exact path="/challenges/:slug" component={ChallengePage} /> */}
        <NavRoute
          exact
          path="/contests/:slug/:slug"
          component={ChallengePage}
        />
        <NavRoute exact path="/practice" component={MainPage} />
        <NavRoute exact path="/rick" component={MyEditor} />
        <Redirect exact from="/" to="/contests" />
        <Redirect to="/contests" />
      </Switch>
    </SApp>
  );
};

export default App;

const SApp = styled.div`
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.whitesmoke};
`;
