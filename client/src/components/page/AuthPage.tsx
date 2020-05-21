import React from "react";
import LoginForm from "../auth/LoginForm";
import styled from "styled-components";
import RegisterForm from "../auth/RegisterForm";
import { Grow, Paper } from "@material-ui/core";

interface Props {
  type: string;
}

const AuthPage: React.FC<Props> = (props) => {
  const { type = "login" } = props;

  return (
    <SAuth>
      <Grow in={true} style={{ transformOrigin: "50% 0 0" }}>
        <Paper elevation={4}>
          {type === "login" && <LoginForm />}
          {type === "register" && <RegisterForm />}
        </Paper>
      </Grow>
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
