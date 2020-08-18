import React, { useEffect } from 'react';
import styled from 'styled-components';
import ContestsContainer from '../contest/ContestsContainer';
import {
  getAuthCookie,
  signInWithJwt,
  deleteAuthCookie,
} from '../../services/authService';

const MainPage: React.FC = (props) => {
  useEffect(() => {
    const jwt = getAuthCookie();
    if (jwt) {
      signInWithJwt(jwt);
      deleteAuthCookie();
      window.location.href = '/';
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
