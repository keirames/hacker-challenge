import React from "react";
import { Container } from "@material-ui/core";
import ContestsContainer from "../contest/ContestsContainer";

const MainPage: React.FC = (props) => {
  return (
    <Container>
      <ContestsContainer />
    </Container>
  );
};

export default MainPage;
