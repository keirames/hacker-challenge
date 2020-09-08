import React from 'react';
import styled from 'styled-components';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { Row, Col } from 'antd';
import NavBar from '../navBar/NavBar';
import Footer from '../footer/Footer';
import AccountContainer from '../settings/account/AccountContainer';
import Password from '../settings/password/Password';
import SideTabsBar from '../settings/SideTabsBar';
import { STheme } from '../../theme/theme';

const SettingsPage: React.FC = () => {
  const { path } = useRouteMatch();

  return (
    <SSettingsPage>
      <NavBar enableBreadcrumbs={false} />
      <SSettingsBody>
        <Row gutter={[0, 0]}>
          <Col span={6}>
            <SideTabsBar />
          </Col>
          <Col span={12}>
            <Switch>
              <Route path={`${path}/account`} component={AccountContainer} />
              <Route path={`${path}/password`} component={Password} />
            </Switch>
          </Col>
        </Row>
      </SSettingsBody>
      <Footer />
    </SSettingsPage>
  );
};

const SSettingsPage = styled.div`
  width: 100%;
  background-color: ${({ theme }: { theme: STheme }) =>
    theme.palette.background.white};
`;

const SSettingsBody = styled.div`
  width: 70%;
  margin: 30px auto;
  padding: 20px;
`;

export default SettingsPage;
