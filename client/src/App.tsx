import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { fetchChallenges } from "./actions";

function App() {
  const dispatch = useDispatch();

  return (
    <SApp>
      <p>Hello world</p>
      <button onClick={() => dispatch(fetchChallenges())}>CLICK</button>
    </SApp>
  );
}

const SApp = styled.div``;

export default App;
