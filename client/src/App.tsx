import React from "react";
import styled from "styled-components";
import MainPage from "./components/page/MainPage";
import { Switch, Route } from "react-router-dom";
import AuthPage from "./components/page/AuthPage";

function App() {
  return (
    <SApp>
      <Switch>
        <Route
          exact
          path="/login"
          component={() => <AuthPage type="login" />}
        />
        <Route
          exact
          path="/register"
          component={() => <AuthPage type="register" />}
        />
        <Route exact path="/" component={MainPage} />
      </Switch>
    </SApp>
  );
}

const SApp = styled.div``;

export default App;
