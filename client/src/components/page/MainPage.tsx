import React, { useEffect } from "react";
import ContestsContainer from "../contest/ContestsContainer";
import {
  getCookie,
  signInWithJwt,
  deleteCookie,
} from "../../services/authService";
import styled from "styled-components";

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
    <SMainPage>
      <ContestsContainer />
    </SMainPage>
  );
};

const SMainPage = styled.div`
  width: 70%;
  margin: auto;
`;

export default MainPage;
