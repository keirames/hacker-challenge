import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import ContestsContainer from "../contest/ContestsContainer";
import {
  getCookie,
  signInWithJwt,
  deleteCookie,
} from "../../services/authService";

const MainPage: React.FC = (props) => {
  useEffect(() => {
    const jwt = getCookie("Authentication");
    if (jwt) {
      signInWithJwt(jwt);
      deleteCookie("Authentication");
      window.location.href = "/";
    }
  }, []);

  return (
    <Container>
      <ContestsContainer />
    </Container>
  );
};

export default MainPage;
