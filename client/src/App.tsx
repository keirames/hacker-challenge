import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import MainPage from './components/pages/MainPage';
import AuthPage from './components/pages/AuthPage';
import { GET_USER_CLIENT } from './mutations';
import { getCurrentUser } from './services/authService';
import { MyEditor } from './MyEditor';
import { STheme } from './theme/theme';
import SettingsPage from './components/pages/SettingsPage';

const App: React.FC = () => {
  const { client } = useQuery(GET_USER_CLIENT);

  useEffect(() => {
    const user = getCurrentUser();
    client.writeQuery({
      query: GET_USER_CLIENT,
      data: { user },
    });
  }, [client]);

  // const ProtectedRoute = ({
  //   component: Component,
  //   ...rest
  // }: {
  //   component: React.FC;
  // }) => (
  //   <Route {...rest}>
  //     {!getCurrentUser() ? (
  //       <Redirect to={{ pathname: '/signin' }} />
  //     ) : (
  //       <Component />
  //     )}
  //   </Route>
  // );

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
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.whitesmoke};
`;
